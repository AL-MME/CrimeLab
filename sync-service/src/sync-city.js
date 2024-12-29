const SyncCity = async (mongoClient, neo4jDriver) => {
  const cities = mongoClient.db("crimeLab").collection("cities");
  const cityChangeStream = cities.watch([], { batchSize: 1000 });

  cityChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            const newCity = change.fullDocument;
            if (newCity.name && newCity.country && newCity.lat && newCity.lon && newCity.postal_code) {
              const queryResult = await tx.run(
                `
                  CREATE (c:City {id: $id, name: $name, country: $country, lat: $lat, lon: $lon, postal_code: $postal_code})
                `,
                {
                  id: newCity._id.toString(),
                  name: newCity.name,
                  country: newCity.country,
                  lat: newCity.lat,
                  lon: newCity.lon,
                  postal_code: newCity.postal_code,
                }
              );
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            await session.run(
              `
                MATCH (c:City {id: $id})
                SET c += $updatedFields
              `,
              {
                id: change.documentKey._id,
                updatedFields,
              }
            );
            break;
          case "delete":
            await session.run(
              `
                MATCH (c:City {id: $id})
                DETACH DELETE c
              `,
              {
                id: change.documentKey._id,
              }
            );
            break;
        }
      });
      console.log("Change processed:", change);
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

module.exports = SyncCity;
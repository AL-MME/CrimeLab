const SyncLocation = async (mongoClient, neo4jDriver) => {
  const locations = mongoClient.db("crimeLab").collection("locations");
  const locationChangeStream = locations.watch([], { batchSize: 1000 });

  locationChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            const newLocation = change.fullDocument;
            if (newLocation.street && newLocation.lat && newLocation.lon && newLocation.city) {
              const queryResult = await tx.run(
                `
                  CREATE (l:Location {id: $id, street: $street, lat: $lat, lon: $lon})
                  WITH l, $city AS cityId
                  MATCH (c:City {id: cityId})
                  MERGE (l)-[:LOCATED_IN]->(c)
                  `,
                {
                  id: newLocation._id.toString(),
                  street: newLocation.street,
                  lat: newLocation.lat,
                  lon: newLocation.lon,
                  city: newLocation.city
                }
              );
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            await session.run(
              `
                  MATCH (l:Location {id: $id})
                  SET l += $updatedFields
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
                    MATCH (l:Location {id: $id})
                    DETACH DELETE l
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

module.exports = SyncLocation;
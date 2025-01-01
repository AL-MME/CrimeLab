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
            await handleInsert(change, tx);
            break;

          case "update":
            await handleUpdate(change, tx);
            break;

          case "delete":
            await handleDelete(change, tx);
            break;

          default:
            console.warn(`Unsupported operation type: ${change.operationType}`);
        }
      });

      console.log("Change processed successfully:", change);
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

/**
 * Handle the insertion of a new city into Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleInsert = async (change, tx) => {
  const newCity = change.fullDocument;
  if (
    newCity.name &&
    newCity.country &&
    newCity.lat &&
    newCity.lon &&
    newCity.postal_code
  ) {
    await tx.run(
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
  } else {
    console.warn("Missing required fields for new city:", newCity);
  }
};

/**
 * Handle the update of a city in Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleUpdate = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  await tx.run(
    `
    MATCH (c:City {id: $id})
    SET c += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

/**
 * Handle the deletion of a city from Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleDelete = async (change, tx) => {
  await tx.run(
    `
    MATCH (c:City {id: $id})
    DETACH DELETE c
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = SyncCity;

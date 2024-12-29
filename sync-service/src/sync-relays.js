const RelaysSync = async (mongoClient, neo4jDriver) => {
  const relays = mongoClient.db("crimeLab").collection("relays");
  const relayChangeStream = relays.watch([], { batchSize: 1000 });

  relayChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            const newRelay = change.fullDocument;
            if (newRelay.name && newRelay.location) {
              const queryResult = await tx.run(
                `
                  CREATE (r:Relay {id: $id, name: $name})
                  WITH r, $location AS locationId
                  MATCH (l:Location {id: locationId})
                  MERGE (r)-[:LOCATED_IN]->(l)
                `,
                {
                  id: newRelay._id.toString(),
                  name: newRelay.name,
                  location: newRelay.location,
                }
              );
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            await session.run(
              `
                MATCH (r:Relay {id: $id})
                SET r += $updatedFields
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
                MATCH (r:Relay {id: $id})
                DETACH DELETE r
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

module.exports = RelaysSync;
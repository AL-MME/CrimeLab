const RelaysSync = async (mongoClient, neo4jDriver) => {
  const relays = mongoClient.db("crimeLab").collection("relays");
  const relayChangeStream = relays.watch([], { batchSize: 1000 });

  relayChangeStream.on("change", async (change) => {
    console.log("Change detected:", JSON.stringify(change, null, 2));

    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            await handleInsertRelay(change, tx);
            break;

          case "update":
            await handleUpdateRelay(change, tx);
            break;

          case "delete":
            await handleDeleteRelay(change, tx);
            break;

          default:
            console.warn(`Unsupported operation type: ${change.operationType}`);
        }
      });

      console.log("Change processed successfully.");
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

const handleInsertRelay = async (change, tx) => {
  const newRelay = change.fullDocument;

  if (newRelay.name !== undefined && newRelay.location !== undefined) {
    await tx.run(
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
  } else {
    console.warn("Missing required fields for new relay:", newRelay);
  }
};

const handleUpdateRelay = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  console.log("Updating relay fields:", updatedFields);

  await tx.run(
    `
    MATCH (r:Relay {id: $id})
    SET r += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

const handleDeleteRelay = async (change, tx) => {
  console.log("Deleting relay:", change.documentKey._id);

  await tx.run(
    `
    MATCH (r:Relay {id: $id})
    DETACH DELETE r
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = RelaysSync;

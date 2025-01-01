const FadettesSync = async (mongoClient, neo4jDriver) => {
  const fadettes = mongoClient.db("crimeLab").collection("fadettes");
  const fadetteChangeStream = fadettes.watch([], { fullDocument: "updateLookup" });

  fadetteChangeStream.on("change", async (change) => {
    console.log("Change detected:", JSON.stringify(change, null, 2));

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

      console.log("Change processed successfully.");
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

/**
 * Handle the insertion of a new fadette into Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleInsert = async (change, tx) => {
  const newFadette = change.fullDocument;

  if (
    newFadette.date &&
    newFadette.duration >= 0 &&
    newFadette.caller &&
    newFadette.receiver &&
    newFadette.type &&
    newFadette.relay
  ) {
    await tx.run(
      `
      CREATE (f:Fadette {id: $id, duration: $duration, date: $date, type: $type})
      WITH f, $caller AS callerId
      MATCH (p1:Person {id: callerId})
      MERGE (f)-[:CALLER]->(p1)
      WITH f, $receiver AS receiverId
      MATCH (p2:Person {id: receiverId})
      MERGE (f)-[:RECEIVER]->(p2)
      WITH f, $relay AS relayId
      MATCH (r:Relay {id: relayId})
      MERGE (f)-[:RELAYED_BY]->(r)
      `,
      {
        id: newFadette._id.toString(),
        date: newFadette.date,
        duration: newFadette.duration,
        caller: newFadette.caller,
        receiver: newFadette.receiver,
        type: newFadette.type,
        relay: newFadette.relay,
      }
    );
  } else {
    console.warn("Missing required fields for new fadette:", newFadette);
  }
};

/**
 * Handle the update of a fadette in Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleUpdate = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  console.log("Updating fields:", updatedFields);

  await tx.run(
    `
    MATCH (f:Fadette {id: $id})
    SET f += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

/**
 * Handle the deletion of a fadette from Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleDelete = async (change, tx) => {
  console.log("Deleting fadette:", change.documentKey._id);

  await tx.run(
    `
    MATCH (f:Fadette {id: $id})
    DETACH DELETE f
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = FadettesSync;

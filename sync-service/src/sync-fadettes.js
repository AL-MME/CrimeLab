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

const handleInsert = async (change, tx) => {
  const newFadette = change.fullDocument;

  if (
    newFadette.date !== undefined &&
    newFadette.duration !== undefined &&
    newFadette.caller !== undefined &&
    newFadette.receiver !== undefined &&
    newFadette.type !== undefined &&
    newFadette.relay !== undefined
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
        date: newFadette.date.toString(),
        duration: newFadette.duration,
        caller: newFadette.caller.toString(),
        receiver: newFadette.receiver.toString(),
        type: newFadette.type,
        relay: newFadette.relay.toString(),
      }
    );
  } else {
    console.warn("Missing required fields for new fadette:", newFadette);
  }
};

const handleUpdate = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;

  if (updatedFields.date) {
    updatedFields.date = updatedFields.date.toString();
  }
  if (updatedFields.caller) {
    updatedFields.caller = updatedFields.caller.toString();
  }
    if (updatedFields.receiver) {
    updatedFields.receiver = updatedFields.receiver.toString();
    }
    if (updatedFields.relay) {
    updatedFields.relay = updatedFields.relay.toString();
    }
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

  const relationships = [
    {key: "caller", label: "Person", relation: "CALLER"},
    {key: "receiver", label: "Person", relation: "RECEIVER"},
    {key: "relay", label: "Relay", relation: "RELAYED_BY"}
  ]

    for (const {key, label, relation} of relationships) {
        if (updatedFields[key]) {
        await tx.run(
            `
            MATCH (f:Fadette {id: $id})-[r:${relation}]->()
            DELETE r
            `,
            {id: change.documentKey._id.toString()}
        );

        await tx.run(
            `
            MATCH (f:Fadette {id: $id})
            MATCH (n:${label} {id: $${key}})
            MERGE (f)-[:${relation}]->(n)
            `,
            {
            id: change.documentKey._id.toString(),
            [key]: updatedFields[key].toString(),
            }
        );
        }
    }

};

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

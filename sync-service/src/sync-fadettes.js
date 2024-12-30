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
            const newFadette = change.fullDocument;
            if (newFadette.date && newFadette.duration >= 0 && newFadette.caller && newFadette.receiver && newFadette.type && newFadette.relay) {
              const queryResult = await tx.run(
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
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            console.log("Updating fields:", updatedFields);
            await session.run(
              `
                MATCH (f:Fadette {id: $id})
                SET f += $updatedFields
              `,
              {
                id: change.documentKey._id.toString(),
                updatedFields,
              }
            );
            break;
          case "delete":
            console.log("Deleting fadette:", change.documentKey._id);
            await session.run(
              `
                MATCH (f:Fadette {id: $id})
                DETACH DELETE f
              `,
              {
                id: change.documentKey._id.toString(),
              }
            );
            break;
        }{
          
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

module.exports = FadettesSync;  
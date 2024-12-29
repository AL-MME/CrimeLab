const TestimonySync = async (mongoClient, neo4jDriver) => {
  const testimonies = mongoClient.db("crimeLab").collection("testimonies");
  const testimonyChangeStream = testimonies.watch([], { batchSize: 1000 });

  testimonyChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            const newTestimony = change.fullDocument;
            if (newTestimony.person && newTestimony.description && newTestimony.date) {
              const queryResult = await tx.run(
                `
                  CREATE (t:Testimony {description: $description, date: $date})
                  WITH t, $person AS personId
                  MATCH (p:Person {id: personId})
                  MERGE (t)-[:GIVEN_BY]->(p)
                `,
                {
                  id: newTestimony._id.toString(),
                  person: newTestimony.person,
                  description: newTestimony.description,
                  date: newTestimony.date,
                }
              );
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            await session.run(
              `
                MATCH (t:Testimony {id: $id})
                SET t += $updatedFields
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
                MATCH (t:Testimony {id: $id})
                DETACH DELETE t
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

module.exports = TestimonySync;
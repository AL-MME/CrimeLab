const PersonSync = async (mongoClient, neo4jDriver) => {
  const persons = mongoClient.db("crimeLab").collection("persons");
  const personChangeStream = persons.watch([], { batchSize: 1000 });

  personChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            const newPerson = change.fullDocument;
            if (newPerson.firstname && newPerson.lastname && newPerson.age && newPerson.location) {
              const queryResult = await tx.run(
                `
                  CREATE (p:Person {id: $id, firstname: $firstname, lastname: $lastname, age: $age})
                  WITH p, $location AS locationId
                  MATCH (l:Location {id: locationId})
                  MERGE (p)-[:LOCATED_IN]->(l)
                `,
                {
                  id: newPerson._id.toString(),
                  firstname: newPerson.firstname,
                  lastname: newPerson.lastname,
                  age: newPerson.age,
                  location: newPerson.location,
                }
              );
              return queryResult.records;
            }
            break;
          case "update":
            const updatedFields = change.updateDescription.updatedFields;
            await session.run(
              `
                MATCH (p:Person {id: $id})
                SET p += $updatedFields
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
                MATCH (p:Person {id: $id})
                DETACH DELETE p
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

module.exports = PersonSync;
const PersonSync = async (mongoClient, neo4jDriver) => {
  const persons = mongoClient.db("crimeLab").collection("persons");
  const personChangeStream = persons.watch([], { batchSize: 1000 });

  personChangeStream.on("change", async (change) => {
    console.log("Change detected:", JSON.stringify(change, null, 2));

    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            await handleInsertPerson(change, tx);
            break;

          case "update":
            await handleUpdatePerson(change, tx);
            break;

          case "delete":
            await handleDeletePerson(change, tx);
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
 * Handle the insertion of a new person into Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleInsertPerson = async (change, tx) => {
  const newPerson = change.fullDocument;

  if (newPerson.firstname && newPerson.lastname && newPerson.age > 0 && newPerson.location) {
    await tx.run(
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
  } else {
    console.warn("Missing required fields for new person:", newPerson);
  }
};

/**
 * Handle the update of a person in Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleUpdatePerson = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  console.log("Updating person fields:", updatedFields);

  await tx.run(
    `
    MATCH (p:Person {id: $id})
    SET p += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

/**
 * Handle the deletion of a person from Neo4j.
 * @param {Object} change - Change stream event.
 * @param {Transaction} tx - Neo4j transaction.
 */
const handleDeletePerson = async (change, tx) => {
  console.log("Deleting person:", change.documentKey._id);

  await tx.run(
    `
    MATCH (p:Person {id: $id})
    DETACH DELETE p
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = PersonSync;

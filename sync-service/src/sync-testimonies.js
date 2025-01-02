const TestimonySync = async (mongoClient, neo4jDriver) => {
  const testimonies = mongoClient.db("crimeLab").collection("testimonies");
  const testimonyChangeStream = testimonies.watch([], { batchSize: 1000 });

  testimonyChangeStream.on("change", async (change) => {
    console.log("Change detected:", JSON.stringify(change, null, 2));

    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            await handleInsertTestimony(change, tx);
            break;

          case "update":
            await handleUpdateTestimony(change, tx);
            break;

          case "delete":
            await handleDeleteTestimony(change, tx);
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

const handleInsertTestimony = async (change, tx) => {
  const newTestimony = change.fullDocument;

  if (newTestimony.person !== undefined && newTestimony.description !== undefined && newTestimony.date !== undefined) {
    await tx.run(
      `
      CREATE (t:Testimony {id: $id, description: $description, date: $date})
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
  } else {
    console.warn("Missing required fields for new testimony:", newTestimony);
  }
};

const handleUpdateTestimony = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  console.log("Updating testimony fields:", updatedFields);

  await tx.run(
    `
    MATCH (t:Testimony {id: $id})
    SET t += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

const handleDeleteTestimony = async (change, tx) => {
  console.log("Deleting testimony:", change.documentKey._id);

  await tx.run(
    `
    MATCH (t:Testimony {id: $id})
    DETACH DELETE t
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = TestimonySync;

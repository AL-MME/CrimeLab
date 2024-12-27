const { MongoClient } = require('mongodb');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

const startSync = async () => {
  const mongoClient = new MongoClient(MONGO_URI);
  const neo4jDriver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

  try {
    await mongoClient.connect();
    const persons = mongoClient.db("crimeLab").collection("persons");

    const personChangeStream = persons.watch();

    personChangeStream.on("change", async (change) => {
      console.log("Change detected:", change);
      const session = neo4jDriver.session();
      try {
        switch (change.operationType) {
          case "insert":
            const newPerson = change.fullDocument;
            if (newPerson.firstname && newPerson.lastname && newPerson.age) {
              await session.run(
                `
                  CREATE (p:Person {id: $id, firstname: $firstname, lastname: $lastname, age: $age})
                `,
                {
                  id: newPerson._id.toString(),
                  firstname: newPerson.firstname,
                  lastname: newPerson.lastname,
                  age: newPerson.age,
                }
              );
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
        console.log("Change processed:", change);
      } catch (err) {
        console.error("Error processing change:", err);
      } finally {
        await session.close();
      }
    });

    console.log("Listening for changes...");
  } catch (error) {
    console.error("Error in sync:", error);
  } finally {
    process.on("SIGINT", async () => {
      await mongoClient.close();
      await neo4jDriver.close();
      console.log("Connections closed. Exiting...");
      process.exit(0);
    });
    process.on("SIGTERM", async () => {
      await mongoClient.close();
      await neo4jDriver.close();
      console.log("Connections closed. Exiting...");
      process.exit(0);
    });
  }
};

startSync();

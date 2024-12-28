const { MongoClient } = require('mongodb');
const neo4j = require('neo4j-driver');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const NEO4J_URI = process.env.NEO4J_URI;
const NEO4J_USER = process.env.NEO4J_USER;
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD;

const mongoClient = new MongoClient(MONGO_URI);
const neo4jDriver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

const startSync = async () => {
  try {
    await mongoClient.connect();
    await CitySync();
    await LocationSync();
    await RelaysSync();
    await PersonSync();
    await TestimonySync();
    await CasesSync();
    await FadettesSync();
  
    console.log("Listening for changes...");
  } catch (error) {
    console.error("Error in sync:", error);
  } finally {
    process.on("SIGINT", async () => { // Close connections on exit Ctrl+C
      await mongoClient.close();
      await neo4jDriver.close();
      console.log("Connections closed. Exiting...");
      process.exit(0);
    });
    process.on("SIGTERM", async () => { // Close connections on exit kill
      await mongoClient.close();
      await neo4jDriver.close();
      console.log("Connections closed. Exiting...");
      process.exit(0);
    });
  }
};

const CitySync = async () => {
  const cities = mongoClient.db("crimeLab").collection("cities");
  const cityChangeStream = cities.watch();

  cityChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newCity = change.fullDocument;
          if (newCity.name && newCity.country && newCity.lat && newCity.lon && newCity.postal_code) {
            await session.run(
              `
                CREATE (c:City {id: $id, name: $name, country: $country, lat: $lat, lon: $lon, postal_code: $postal_code})
              `,
              {
                id: newCity._id.toString(),
                name: newCity.name,
                country: newCity.country,
                lat: newCity.lat,
                lon: newCity.lon,
                postal_code: newCity.postal_code,
              }
            );
          }
          break;
        case "update":
          const updatedFields = change.updateDescription.updatedFields;
          await session.run(
            `
              MATCH (c:City {id: $id})
              SET c += $updatedFields
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
              MATCH (c:City {id: $id})
              DETACH DELETE c
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
};

const LocationSync = async () => {
  const locations = mongoClient.db("crimeLab").collection("locations");
  const locationChangeStream = locations.watch();

  locationChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newLocation = change.fullDocument;
          if (newLocation.street && newLocation.lat && newLocation.lon && newLocation.city) {
            await session.run(
              `
                CREATE (l:Location {id: $id, street: $street, lat: $lat, lon: $lon})
                WITH l, $city AS cityId
                MATCH (c:City {id: cityId})
                MERGE (l)-[:LOCATED_IN]->(c)
              `,
              {
                id: newLocation._id.toString(),
                street: newLocation.street,
                lat: newLocation.lat,
                lon: newLocation.lon,
                city: newLocation.city
              }
            );
          }
          break;
        case "update":
          const updatedFields = change.updateDescription.updatedFields;
          await session.run(
            `
              MATCH (l:Location {id: $id})
              SET l += $updatedFields
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
              MATCH (l:Location {id: $id})
              DETACH DELETE l
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
};

const RelaysSync = async () => {
  const relays = mongoClient.db("crimeLab").collection("relays");
  const relayChangeStream = relays.watch();

  relayChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newRelay = change.fullDocument;
          if (newRelay.name && newRelay.location) {
            await session.run(
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
      console.log("Change processed:", change);
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

const PersonSync = async () => {
  const persons = mongoClient.db("crimeLab").collection("persons");
  const personChangeStream = persons.watch();

  personChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newPerson = change.fullDocument;
          if (newPerson.firstname && newPerson.lastname && newPerson.age && newPerson.location) {
            await session.run(
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
};

const TestimonySync = async () => {
  const testimonies = mongoClient.db("crimeLab").collection("testimonies");
  const testimonyChangeStream = testimonies.watch();

  testimonyChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newTestimony = change.fullDocument;
          if (newTestimony.person && newTestimony.description && newTestimony.date) {
            await session.run(
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
      console.log("Change processed:", change);
    } catch (err) {
      console.error("Error processing change:", err);
    } finally {
      await session.close();
    }
  });
};

const CasesSync = async () => {
  const cases = mongoClient.db("crimeLab").collection("cases");
  const caseChangeStream = cases.watch();

  caseChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newCase = change.fullDocument;
          if (newCase.type && newCase.description && newCase.date && newCase.location && newCase.suspects && newCase.witnesses && newCase.victims && newCase.testimonies) {
            await session.run(
              `
                CREATE (c:Case {
                    id: $caseId,
                    type: $type,
                    description: $description,
                    date: $date
                })
                MATCH (l:Location {id: $locationId})
                MERGE (c)-[:OCCURRED_AT]->(l)
                UNWIND $suspects AS suspect
                MERGE (p:Person {id: suspect})
                MERGE (c)-[:HAS_SUSPECT]->(p)
                UNWIND $witnesses AS witness
                MERGE (p:Person {id: witness})
                MERGE (c)-[:HAS_WITNESS]->(p)
                UNWIND $victims AS victim
                MERGE (p:Person {id: victim})
                MERGE (c)-[:HAS_VICTIM]->(p)
                UNWIND $testimonies AS testimony
                MERGE (t:Testimony {id: testimony})
                MERGE (c)-[:HAS_TESTIMONY]->(t)
              `,
              {
                id: newCase._id.toString(),
                type: newCase.type,
                description: newCase.description,
                date: newCase.date,
                location: newCase.location,
                suspects: newCase.suspects,
                witnesses: newCase.witnesses,
                victims: newCase.victims,
                testimonies: newCase.testimonies,
              }
            );
          }
          break;
        case "update":
          const updatedFields = change.updateDescription.updatedFields;
          await session.run(
            `
              MATCH (c:Case {id: $id})
              SET c += $updatedFields
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
              MATCH (c:Case {id: $id})
              DETACH DELETE c
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
};

const FadettesSync = async () => {
  const fadettes = mongoClient.db("crimeLab").collection("fadettes");
  const fadetteChangeStream = fadettes.watch();

  fadetteChangeStream.on("change", async (change) => {
    console.log("Change detected:", change);
    const session = neo4jDriver.session();
    try {
      switch (change.operationType) {
        case "insert":
          const newFadette = change.fullDocument;
          if (newFadette.date && newFadette.duration && newFadette.caller && newFadette.receiver && newFadette.type && newFadette.relay) {
            await session.run(
              `
                CREATE (f:Fadette {duration: $duration, date: $date, type: $type})
                WITH f, $caller AS callerId
                MATCH (p:Person {id: callerId})
                MERGE (f)-[:CALLER]->(p)
                WITH f, $receiver AS receiverId
                MATCH (p:Person {id: receiverId})
                MERGE (f)-[:RECEIVER]->(p)
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
          }
          break;
        case "update":
          const updatedFields = change.updateDescription.updatedFields;
          await session.run(
            `
              MATCH (f:Fadette {id: $id})
              SET f += $updatedFields
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
              MATCH (f:Fadette {id: $id})
              DETACH DELETE f
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
};

startSync();

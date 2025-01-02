const { MongoClient } = require('mongodb');
const neo4j = require('neo4j-driver');
const SyncCity = require('./src/sync-city');
const SyncLocation = require('./src/sync-location');
const RelaysSync = require('./src/sync-relays');
const PersonSync = require('./src/sync-persons');
const TestimonySync = require('./src/sync-testimonies');
const CasesSync = require('./src/sync-cases');
const FadettesSync = require('./src/sync-fadettes');
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
    await SyncCity(mongoClient, neo4jDriver);
    await SyncLocation(mongoClient, neo4jDriver);
    await RelaysSync(mongoClient, neo4jDriver);
    await PersonSync(mongoClient, neo4jDriver);
    await TestimonySync(mongoClient, neo4jDriver);
    await CasesSync(mongoClient, neo4jDriver);
    await FadettesSync(mongoClient, neo4jDriver);
  
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

startSync();
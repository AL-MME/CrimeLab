const SyncLocation = async (mongoClient, neo4jDriver) => {
  const locations = mongoClient.db("crimeLab").collection("locations");
  const locationChangeStream = locations.watch([], { batchSize: 1000 });

  locationChangeStream.on("change", async (change) => {
    console.log("Change detected:", JSON.stringify(change, null, 2));

    const session = neo4jDriver.session();
    try {
      await session.writeTransaction(async (tx) => {
        switch (change.operationType) {
          case "insert":
            await handleInsertLocation(change, tx);
            break;

          case "update":
            await handleUpdateLocation(change, tx);
            break;

          case "delete":
            await handleDeleteLocation(change, tx);
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

const handleInsertLocation = async (change, tx) => {
  const newLocation = change.fullDocument;

  if (newLocation.street !== undefined && newLocation.lat !== undefined && newLocation.lon !== undefined && newLocation.city !== undefined) {
    await tx.run(
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
        city: newLocation.city.toString(),
      }
    );
  } else {
    console.warn("Missing required fields for new location:", newLocation);
  }
};

const handleUpdateLocation = async (change, tx) => {
  const updatedFields = change.updateDescription.updatedFields;
  console.log("Updating location fields:", updatedFields);

  if (updatedFields.city) {
    updatedFields.city = updatedFields.city.toString();

    await tx.run(
      `
      MATCH (l:Location {id: $id})-[r:LOCATED_IN]->()
      DELETE r
      `,
      {
        id: change.documentKey._id.toString(),
      }
    );

    await tx.run(
        `
        MATCH (l:Location {id: $id}), (c:City {id: $city})
        MERGE (l)-[:LOCATED_IN]->(c)
        `,
        {
            id: change.documentKey._id.toString(),
            city: updatedFields.city,
        }
        );
  }

  await tx.run(
    `
    MATCH (l:Location {id: $id})
    SET l += $updatedFields
    `,
    {
      id: change.documentKey._id.toString(),
      updatedFields,
    }
  );
};

const handleDeleteLocation = async (change, tx) => {
  console.log("Deleting location:", change.documentKey._id);

  await tx.run(
    `
    MATCH (l:Location {id: $id})
    DETACH DELETE l
    `,
    {
      id: change.documentKey._id.toString(),
    }
  );
};

module.exports = SyncLocation;

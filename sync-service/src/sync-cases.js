const CasesSync = async (mongoClient, neo4jDriver) => {
    const cases = mongoClient.db("crimeLab").collection("cases");
    const caseChangeStream = cases.watch([], { batchSize: 1000 });

    caseChangeStream.on("change", async (change) => {
        console.log("Change detected:", change);
        const session = neo4jDriver.session();
        try {
            await session.writeTransaction(async (tx) => {
                switch (change.operationType) {
                    case "insert":
                        const newCase = change.fullDocument;
                        if (newCase.type && newCase.description && newCase.date && newCase.location && newCase.suspects && newCase.witnesses && newCase.victims && newCase.testimonies) {
                            const queryResult = await tx.run(
                                `
                  CREATE (c:Case {
                      id: $id,
                      type: $type,
                      description: $description,
                      date: $date
                  })
                    WITH c, $location AS locationId
                  MATCH (l:Location {id: locationId})
                  MERGE (c)-[:OCCURRED_AT]->(l)
                  WITH c
                  UNWIND $suspects AS suspect
                  MERGE (s:Person {id: suspect})
                  MERGE (c)-[:HAS_SUSPECT]->(s)
                  WITH c
                  UNWIND $witnesses AS witness
                  MERGE (w:Person {id: witness})
                  MERGE (c)-[:HAS_WITNESS]->(w)
                    WITH c
                  UNWIND $victims AS victim
                  MERGE (v:Person {id: victim})
                  MERGE (c)-[:HAS_VICTIM]->(v)
                    WITH c
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
                            return queryResult.records;
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
            });
            console.log("Change processed:", change);
        } catch (err) {
            console.error("Error processing change:", err);
        } finally {
            await session.close();
        }
    });
};

module.exports = CasesSync;
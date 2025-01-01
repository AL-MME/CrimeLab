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
                        if (
                            newCase.type &&
                            newCase.description &&
                            newCase.date &&
                            newCase.location &&
                            newCase.suspects &&
                            newCase.witnesses &&
                            newCase.victims &&
                            newCase.testimonies
                        ) {
                            // Création du noeud principal
                            await tx.run(
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
                                `,
                                {
                                    id: newCase._id.toString(),
                                    type: newCase.type,
                                    description: newCase.description,
                                    date: newCase.date,
                                    location: newCase.location,
                                }
                            );

                            // Relations dynamiques
                            const relationships = [
                                { key: "suspects", label: "Person", relation: "HAS_SUSPECT" },
                                { key: "witnesses", label: "Person", relation: "HAS_WITNESS" },
                                { key: "victims", label: "Person", relation: "HAS_VICTIM" },
                                { key: "testimonies", label: "Testimony", relation: "HAS_TESTIMONY" },
                            ];

                            for (const { key, label, relation } of relationships) {
                                if (Array.isArray(newCase[key])) {
                                    for (const element of newCase[key]) {
                                        await tx.run(
                                            `
                                            MATCH (c:Case {id: $caseId})
                                            MERGE (n:${label} {id: $elementId})
                                            MERGE (c)-[:${relation}]->(n)
                                            `,
                                            {
                                                caseId: newCase._id.toString(),
                                                elementId: element,
                                            }
                                        );
                                    }
                                }
                            }
                        }
                        break;

                    case "update":
                        const updatedFields = change.updateDescription.updatedFields;
                        await tx.run(
                            `
                            MATCH (c:Case {id: $id})
                            SET c += $updatedFields
                            `,
                            {
                                id: change.documentKey._id.toString(),
                                updatedFields,
                            }
                        );
                        break;

                    case "delete":
                        await tx.run(
                            `
                            MATCH (c:Case {id: $id})
                            DETACH DELETE c
                            `,
                            {
                                id: change.documentKey._id.toString(),
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

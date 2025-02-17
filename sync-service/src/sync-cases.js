const CasesSync = async (mongoClient, neo4jDriver) => {
    const cases = mongoClient.db("crimeLab").collection("cases");
    const caseChangeStream = cases.watch([], {batchSize: 1000});

    caseChangeStream.on("change", async (change) => {
        console.log("Change detected:", change);
        const session = neo4jDriver.session();

        try {
            await session.writeTransaction(async (tx) => {
                switch (change.operationType) {
                    case "insert":
                        const newCase = change.fullDocument;
                        if ( // On vérifie que les champs obligatoires sont bien présents, on met bien undefined pour éviter les erreurs quand les valeurs valent 0 ou "" par exemple
                            newCase.type !== undefined &&
                            newCase.description !== undefined &&
                            newCase.date !== undefined &&
                            newCase.location !== undefined &&
                            newCase.suspects !== undefined &&
                            newCase.witnesses !== undefined &&
                            newCase.victims !== undefined &&
                            newCase.testimonies !== undefined
                        ) {
                            // On crée le noeud de base
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
                                    date: newCase.date.toString(),
                                    location: newCase.location.toString(),
                                }
                            );

                            // On indique quels sont ses types de relations
                            const relationships = [
                                {key: "suspects", label: "Person", relation: "HAS_SUSPECT"},
                                {key: "witnesses", label: "Person", relation: "HAS_WITNESS"},
                                {key: "victims", label: "Person", relation: "HAS_VICTIM"},
                                {key: "testimonies", label: "Testimony", relation: "HAS_TESTIMONY"},
                            ];

                            // On les applique
                            for (const {key, label, relation} of relationships) {
                                if (Array.isArray(newCase[key])) { // ici du coup ce serait newCase.suspects, newCase.witnesses, etc
                                    for (const element of newCase[key]) { // On prend les éléments vu que c'est un tableau (des id)
                                        await tx.run(
                                            `
                                            MATCH (c:Case {id: $caseId})
                                            MERGE (n:${label} {id: $elementId})
                                            MERGE (c)-[:${relation}]->(n)
                                            `,
                                            {
                                                caseId: newCase._id.toString(),
                                                elementId: element.toString(),
                                            }
                                        );
                                    }
                                }
                            }
                        }
                        break;

                    case "update":
                        const updatedFields = change.updateDescription.updatedFields;
                        const caseId = change.documentKey._id.toString();

                        if (updatedFields.date) {
                            updatedFields.date = updatedFields.date.toString();
                        }
                        if (updatedFields.location) {
                            updatedFields.location = updatedFields.location.toString();
                        }
                        if (updatedFields.suspects) {
                            updatedFields.suspects = updatedFields.suspects.map((id) => id.toString());
                        }
                        if (updatedFields.witnesses) {
                            updatedFields.witnesses = updatedFields.witnesses.map((id) => id.toString());
                        }
                        if (updatedFields.victims) {
                            updatedFields.victims = updatedFields.victims.map((id) => id.toString());
                        }
                        if (updatedFields.testimonies) {
                            updatedFields.testimonies = updatedFields.testimonies.map((id) => id.toString());
                        }

                        await tx.run(
                            `
                                MATCH (c:Case {id: $caseId})
                                SET c += $updatedFields
                                `,
                            {
                                caseId,
                                updatedFields,
                            }
                        );

                        if (updatedFields.location) {
                            await tx.run(
                                `
                                MATCH (c:Case {id: $caseId})-[r:OCCURRED_AT]->()
                                DELETE r
                                `,
                                {caseId}
                            );

                            await tx.run(
                                `
                                MATCH (c:Case {id: $caseId})
                                MATCH (l:Location {id: $locationId})
                                MERGE (c)-[:OCCURRED_AT]->(l)
                                `,
                                {caseId, locationId: updatedFields.location}
                            );
                        }

                        // Gestion des relations : On supprime et recrée si nécessaire
                        const relationships = [
                            {key: "suspects", label: "Person", relation: "HAS_SUSPECT"},
                            {key: "witnesses", label: "Person", relation: "HAS_WITNESS"},
                            {key: "victims", label: "Person", relation: "HAS_VICTIM"},
                            {key: "testimonies", label: "Testimony", relation: "HAS_TESTIMONY"},
                        ];

                        for (const {key, label, relation} of relationships) {
                            if (updatedFields[key]) {
                                // Supprimer les anciennes relations
                                console.log("Deleting old relations", key);
                                await tx.run(
                                    `
                                        MATCH (c:Case {id: $caseId})-[r:${relation}]->()
                                        DELETE r
                                        `,
                                    {caseId}
                                );

                                // Ajouter les nouvelles relations
                                for (const elementId of updatedFields[key]) {
                                    console.log("Creating new relation", key, elementId);
                                    await tx.run(
                                        `
                                            MATCH (c:Case {id: $caseId})
                                            MERGE (n:${label} {id: $elementId})
                                            MERGE (c)-[:${relation}]->(n)
                                            `,
                                        {caseId, elementId: elementId.toString()}
                                    );
                                }
                            }
                        }
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

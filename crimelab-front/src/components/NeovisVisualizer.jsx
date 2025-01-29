import React, { useEffect } from "react";
import * as NeoVis from "neovis.js";
import "../css/details.css";

const NeoGraph = () => {
    useEffect(() => {
        const config = {
            containerId: "viz",
            neo4j: {
                serverUrl: process.env.REACT_APP_NEO_URL,
                serverUser: process.env.REACT_APP_NEO_USER,
                serverPassword: process.env.REACT_APP_NEO_PWD,
            },
            visConfig: {
                edges: {
                    arrows: {
                        to: {
                            enabled: true
                        }
                    },
                },
            },
            labels: {
                Person: {
                    label: "firstname",
                    [NeoVis.NEOVIS_ADVANCED_CONFIG]: {
                        cypher: {
                            value: "MATCH (n) RETURN n.firstname;"
                        },
                    }
                },
            },
            relationships: {
                KNOWS: {
                    thickness: "weight",
                },
            },
            initialCypher: "MATCH (n)-[r]-(m) RETURN n,r,m",
        };

        const viz = new NeoVis.default(config);

        viz.registerOnEvent("clickNode", (event) => {
            if (event.node) {
                console.log("Node clicked: ", event.node);
            }
        });

        viz.render();
    }, []);

    return (
        <div style={{ textAlign: "center", width: "100%", height: "100%" }}>
            <div id="viz" style={{ width: "100%", height: "100%" }} />
        </div>
    );
};

export default NeoGraph;

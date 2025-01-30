import React, { useEffect } from "react";
import * as NeoVis from "neovis.js";
import "../css/details.css";

const NeoGraph = ({ onNodeClick }) => {
    useEffect(() => {
        const config = {
            containerId: "viz",
            neo4j: {
                serverUrl: process.env.REACT_APP_NEO_URL,
                serverUser: process.env.REACT_APP_NEO_USER,
                serverPassword: process.env.REACT_APP_NEO_PWD,
            },
            visConfig: {
                nodes: {
                    shape: "dot",
                    size: 32,
                    font: {
                        size: 16,
                        color: "#FFFFFF",
                        strokeWidth: 0,
                    },
                },
                edges: {
                    arrows: {
                        to: { enabled: true }
                    },
                    color: "#848484",
                    width: 2,
                    font: {
                        size: 14,
                        align: "middle",
                        color: "#FFFFFF",
                        strokeWidth: 0,
                    },
                },
                physics: {
                    enabled: true,
                    barnesHut: {
                        gravitationalConstant: -30000,
                        centralGravity: 0.5,
                        springLength: 150,
                        springConstant: 0.04,
                    }
                },
                interaction: {
                    zoomView: true,
                    dragNodes: true
                }
            },
            labels: {
                Person: { label: "firstname" },
                Location: { label: "street" },
                Relay: { label: "name" },
                City: { label: "name" },
                Case: { label: "type" },
                Fadette: { label: "type" }
            },
            initialCypher: "MATCH (n)-[r]-(m) RETURN n, r, m",
        };

        const nodeConfigFunction = (node) => {
            const labels = node.raw?.labels || [];
            switch (labels[0]) {
                case "Person":
                    node.shape = "diamond";
                    node.color = "#FF4D4D";
                    break;
                case "Location":
                    node.color = "#4CAF50";
                    break;
                case "Relay":
                    node.color = "#2F8FED";
                    break;
                case "City":
                    node.color = "#D670DB";
                    break;
                case "Case":
                    node.shape = "star";
                    node.color = "#FFD700";
                    break;
                case "Fadette":
                    node.color = "#00AFFF";
                    break;
                default:
                    node.color = "#E0E0E0";
            }
            return node;
        };

        const viz = new NeoVis.default(config);

        viz.registerOnEvent("completed", () => {
            const network = viz.network;
            const edges = network.body.data.edges.get();

            edges.forEach(edge => {
                const relationshipType = edge.raw?.type || "Unknown";
                edge.label = relationshipType;
                network.body.data.edges.update([edge]);
            });

            network.body.data.nodes.update(network.body.data.nodes.get().map(nodeConfigFunction));
        });

        viz.registerOnEvent("clickNode", (event) => {
            if (event.node) {
                onNodeClick(event.node);
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

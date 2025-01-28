import React, { useEffect, useState } from "react";
import { ForceGraph2D } from "react-force-graph";

const GraphVisualizer = () => {
    const [graphData, setGraphData] = useState({
        nodes: [],
        links: [],
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3001/api/graph");
                const data = await response.json();

                console.log("Données reçues depuis l'API :", data);

                // Transforme les données pour le graphe
                setGraphData({
                    nodes: data.nodes.map((node) => ({
                        id: node.id, // Identifiant unique du nœud
                        name: node.label, // Texte ou nom du nœud
                        group: node.group || 1, // Groupe pour la coloration
                    })),
                    links: data.edges.map((edge) => ({
                        source: edge.from, // Source de l'arête
                        target: edge.to,   // Cible de l'arête
                    })),
                });
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h1>Visualiseur de Graph</h1>
            <ForceGraph2D
                graphData={graphData} // Données du graphe
                nodeLabel="name" // Nom affiché au survol d'un nœud
                nodeAutoColorBy="group" // Coloration automatique par groupe
                linkDirectionalArrowLength={6} // Flèches sur les arêtes
                linkDirectionalArrowRelPos={1} // Position des flèches
                width={800} // Largeur du canvas
                height={600} // Hauteur du canvas
            />
        </div>
    );
};

export default GraphVisualizer;

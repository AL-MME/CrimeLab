import React, { useEffect, useRef, useState } from 'react';
import NeoVis from 'neovis.js';

const NeovisVisualizer = () => {
    const visRef = useRef(null);
    const [graphData, setGraphData] = useState(null);

    // Récupérer les données depuis le backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/graph');
                const data = await response.json();
                setGraphData(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };

        fetchData();
    }, []);

    // Initialiser Neovis.js une fois les données chargées
    useEffect(() => {
        if (!graphData || !visRef.current) return;

        const config = {
            container: visRef.current,
            nodes: graphData.nodes,
            relationships: graphData.relationships,
            labels: {}, // Pas de configuration spécifique pour les labels
            initialCypher: 'RETURN 1', // Requête factice (non utilisée ici)
            nodeConfiguration: {
                defaultCaption: 'id', // Utiliser l'ID comme étiquette par défaut
                defaultSize: 10, // Taille par défaut des nœuds
                defaultColor: '#97C2FC', // Couleur par défaut des nœuds
            },
            relationshipConfiguration: {
                defaultCaption: 'type', // Utiliser le type comme étiquette par défaut
                defaultThickness: 2, // Épaisseur par défaut des liens
                defaultColor: '#FF6F61', // Couleur par défaut des liens
            },
        };

        const vis = new NeoVis(config);
        vis.render();

        return () => {
            // Nettoyage si nécessaire
        };
    }, [graphData]);

    return <div ref={visRef} style={{ width: '100%', height: '600px' }} />;
};

export default NeovisVisualizer;
import React from 'react';
import '../css/crimeView.css';
import GraphVisualizer from "../components/GraphVisualizer";

const CrimeView = (props) => (
    <div className="crimeView">
        <h1>Crime View</h1>
        <GraphVisualizer />
    </div>
);

export default CrimeView;
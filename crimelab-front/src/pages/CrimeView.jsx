import React from 'react';
import '../css/crimeView.css';
import NeovisVisualizer from "../components/NeovisVisualizer";

const CrimeView = (props) => (
    <div className="crimeView">
        <h1>Crime View</h1>
        {/*<GraphVisualizer />*/}
        <NeovisVisualizer />
    </div>
);

export default CrimeView;
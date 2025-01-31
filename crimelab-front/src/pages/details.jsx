import React, { useState, useEffect } from "react";
import "../css/details.css";
import { useLocation } from "react-router-dom";
import NeoGraph from "../components/NeovisVisualizer";
import { NodeDetails } from "../components/NodeDetails";

export const Details = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    const cat = queryParams.get('cat');
    const [showDetails, setShowDetails] = useState(false);
    const [nodeDetails, setNodeDetails] = useState({});
    const [popUpState, setPopupState] = useState(false);

    const handleNodeClick = (node) => {
        setShowDetails(true);
        setNodeDetails(node.raw.properties);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    const openPopup = () => {
        setPopupState(true);
    };

    const closePopup = () => {
        setPopupState(false);
    };

    return (
        <div className="details-background">
            <div className="details-background-image">
                <div className="details-navbar">
                    <div className="details-navbar-title">
                        <h1 className="crimeLabH1">CrimeLab</h1>
                    </div>
                </div>
                <div className="details-content">
                    <NeoGraph onNodeClick={handleNodeClick}/>
                </div>
                {showDetails && <NodeDetails node={nodeDetails} closeDetails={closeDetails} openPopup={openPopup} />}
                {popUpState && 
                <div className="popup-background" onClick={closePopup}>
                    <div className="popup-content">
                        <h1 className="crimeLabH1">Are you sure you want to delete this node?</h1>
                        <div className="popup-buttons">
                            <button className="details-close-button" onClick={closePopup}>Cancel</button>
                            <button className="details-close-button" onClick={closePopup}>Delete</button>
                        </div>
                    </div>
                    </div>}
            </div>
        </div>
    );
};

import React from "react";
import "../css/details.css";
import { FaTimes } from "react-icons/fa";
import { RemoveNodeButton } from "./RemoveNodeButton";
import {CategoryAdapter} from "../utils/categoryAdapter";
import EditNodeButton from "./NodeEdition/EditNodeButton";

export const NodeDetails = ({ node, closeDetails, category, onNodeChange }) => {
    return (
        <div className="details-node">
            <FaTimes className="close-icon" onClick={closeDetails} />
            <div className="details-navbar-title">
                <h1 className="crimeLabH1">Informations</h1>
            </div>
            <div className="node-details-content">
                {Object.keys(node).map((key) => {
                    return (
                        <div className="details-key-value-container" key={key}>
                            <p className="details-key-value">{key.charAt(0).toUpperCase() + key.slice(1)} :</p>
                            <p className="details-key-value">
                                {isNaN(node[key]) && !isNaN(Date.parse(node[key])) ? new Date(node[key]).toLocaleString() : node[key]}
                            </p>
                        </div>
                    );
                })}
            </div>
            <EditNodeButton nodeId={node.id} nodeCategory={CategoryAdapter.adaptCategory(category)} />
            <RemoveNodeButton nodeId={node.id} nodeCategory={category} onDelete={() => onNodeChange()} />
        </div>
    );
};
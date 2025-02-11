import React from "react";
import "../css/details.css";
import { FaTimes } from "react-icons/fa";
import {RemoveNodeButton} from "./RemoveNodeButton";
import EditNodeButton from "./EditNodeButton";

export const NodeDetails = ({ node, closeDetails, category, onNodeChange }) => {
    return (
        <div className="details-node">
            <FaTimes className="close-icon" onClick={closeDetails} />
            <div className="details-navbar-title">
                <h1 className="crimeLabH1">Node Details</h1>
            </div>
            <div className="node-details-content">
                {Object.keys(node).map((key) => {
                    return (
                        <div className="details-key-value-container" key={key}>
                            <p className="details-key-value">{key} :</p>
                            <p className="details-key-value">{node[key]}</p>
                        </div>
                    );
                })}
            </div>
            <EditNodeButton node={node} nodeCategory={category} onNodeChange={onNodeChange} />
            <RemoveNodeButton nodeId={node.id} nodeCategory={category} onDelete={() => onNodeChange()} />
        </div>
    );
};
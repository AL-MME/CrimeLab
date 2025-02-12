import React, { useState } from "react";
import "../css/details.css";
import { FaTimes } from "react-icons/fa";
import { RemoveNodeButton } from "./RemoveNodeButton";
import {CategoryAdapter} from "../utils/categoryAdapter";

export const NodeDetails = ({ node, closeDetails, category, onNodeChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedNode, setEditedNode] = useState({ ...node });

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const url = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${url}/${CategoryAdapter.adaptCategory(category)}/${node.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(editedNode),
            });
            if (response.ok) {
                console.log("Node updated");
                setIsEditing(false);
                onNodeChange();
            } else {
                console.log("Error updating node");
            }
        } catch (error) {
            console.log("Error updating node", error);
        }
    };

    const handleChange = (key, value) => {
        setEditedNode({ ...editedNode, [key]: value });
    };

    return (
        <div className="details-node">
            <FaTimes className="close-icon" onClick={closeDetails} />
            <div className="details-navbar-title">
                <h1 className="crimeLabH1">Node Details</h1>
            </div>
            <div className="node-details-content">
                {Object.keys(node).map((key) => (
                    <div className="details-key-value-container" key={key}>
                        <p className="details-key-value-p">{key} :</p>
                        {isEditing ? (
                            <input
                                type="text"
                                className="details-key-value-input"
                                value={editedNode[key]}
                                onChange={(e) => handleChange(key, e.target.value)}
                            />
                        ) : (
                            <p className="details-key-value">{node[key]}</p>
                        )}
                    </div>
                ))}
            </div>
            {isEditing ? (
                <button className="details-save-button" onClick={handleSaveClick}>Sauvegarder</button>
            ) : (
                <button className="details-edit-button" onClick={handleEditClick}>Éditer</button>
            )}
            <RemoveNodeButton nodeId={node.id} nodeCategory={category} onDelete={() => onNodeChange()} />
        </div>
    );
};
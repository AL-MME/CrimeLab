import React from "react";
import {CategoryAdapter} from "../utils/categoryAdapter";


export const RemoveNodeButton = ({ nodeId, nodeCategory, onDelete }) => {


    const removeNode = async (id, category) => {
        const url = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${url}/${CategoryAdapter.adaptCategory(category)}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                console.log("Node deleted");
                onDelete();
            } else {
                console.log("Error deleting node");
            }
        } catch (error) {
            console.log("Error deleting node", error);
        }

    }

    return (
        <button className="details-close-button" onClick={() => removeNode(nodeId, nodeCategory)}>Supprimer</button>
    );
}
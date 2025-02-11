import React, { useState } from "react";
import NodeEditionModal from "./NodeEditionModal";

const EditNodeButton = ({ node, nodeCategory, onNodeChange }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSave = async (formData) => {
        const url = process.env.REACT_APP_API_URL;
        try {
            const response = await fetch(`${url}/nodes/${node.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Node updated");
                onNodeChange();
            } else {
                console.log("Error updating node");
            }
        } catch (error) {
            console.log("Error updating node", error);
        }
    };

    return (
        <>
            <button className={'details-edit-button'} onClick={handleEditClick}>Éditer le Node</button>
            <NodeEditionModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSave={handleSave}
                nodeId={node.id}
                nodeCategory={nodeCategory}
            />
        </>
    );
};

export default EditNodeButton;
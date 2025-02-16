import React, { useState } from "react";

const AddPersonPopup = ({ onClose, onAdd }) => {
    const [personData, setPersonData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        location: "",
    });

    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPersonData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/persons`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(personData),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la personne");
            }
            const newPerson = await response.json();
            onAdd(newPerson);
            onClose();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter une Personne</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="firstname" placeholder="Prénom" onChange={handleChange} required />
                    <input type="text" id="lastname" placeholder="Nom" onChange={handleChange} required />
                    <input type="number" id="age" placeholder="Âge" onChange={handleChange} required />
                    <input type="text" id="location" placeholder="Lieu" onChange={handleChange} required />
                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddPersonPopup;
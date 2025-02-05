import React, { useState } from "react";

const AddPersonPopup = ({ onClose, onAdd }) => {
    const [peronData, setPersonData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        location: "",
        call_history: [],
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPersonData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(peronData);
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

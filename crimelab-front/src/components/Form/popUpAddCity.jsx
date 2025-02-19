import React, { useState } from "react";

const AddCityPopup = ({ onClose, onAdd }) => {
    const [cityData, setCityData] = useState({
        name: "",
        country: "",
        lat: "",
        lon: "",
        postal_code: "",
    });

    const API_URL = process.env.REACT_APP_API_URL;

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCityData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAddCity = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/cities`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(cityData),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création de la ville");
            }
            const newCity = await response.json();
            onAdd(newCity);
            onClose();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter une Ville</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleAddCity}>
                    <input type="text" id="name" placeholder="Nom" onChange={handleChange} required />
                    <input type="text" id="country" placeholder="Pays" onChange={handleChange} required />
                    <input type="number" id="lat" placeholder="Latitude" step="0.000001" onChange={handleChange} required />
                    <input type="number" id="lon" placeholder="Longitude" step="0.000001" onChange={handleChange} required />
                    <input type="number" id="postal_code" placeholder="Code Postal" onChange={handleChange} required />
                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddCityPopup;

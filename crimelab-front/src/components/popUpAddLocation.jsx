import React, { useState } from "react";

const AddLocationPopup = ({ onClose, onAdd }) => {
    const [locationData, setLocationData] = useState({
        street: "",
        city: "",
        lat: "",
        lon: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLocationData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(locationData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter un Lieu</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="street" placeholder="Rue" onChange={handleChange} required />
                    <input type="text" id="city" placeholder="Ville" onChange={handleChange} required />
                    <input type="text" id="lat" placeholder="Latitude" onChange={handleChange} required />
                    <input type="text" id="lon" placeholder="Longitude" onChange={handleChange} required />
                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddLocationPopup;

import React, { useState } from "react";

const AddCityPopup = ({ onClose, onAdd }) => {
    const [cityData, setCityData] = useState({
        name: "",
        country: "",
        lat: "",
        lon: "",
        postal_code: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCityData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(cityData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter une Ville</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="name" placeholder="Nom" onChange={handleChange} required />
                    <input type="text" id="country" placeholder="Country" onChange={handleChange} required />
                    <input type="text" id="lat" placeholder="Latitude" onChange={handleChange} required />
                    <input type="text" id="lon" placeholder="Longitude" onChange={handleChange} required />
                    <input type="text" id="postal_code" placeholder="postal_code" onChange={handleChange} required />
                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddCityPopup;

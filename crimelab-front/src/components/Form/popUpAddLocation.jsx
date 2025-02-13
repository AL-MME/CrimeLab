import React, { useState, useEffect } from "react";
import AddCityPopup from "./popUpAddCity";

const AddLocationPopup = ({ onClose, onAdd }) => {
    const [locationData, setLocationData] = useState({
        street: "",
        city: "",
        lat: "",
        lon: "",
    });

    const [cities, setCities] = useState([]);
    const [isPopupOpenCity, setIsPopupOpenCity] = useState(false);


    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_URL}/cities`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des villes");
                }
                const data = await response.json();
                setCities(data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchCities();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setLocationData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAddLocation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/locations`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(locationData),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création du lieu");
            }
            const newLocation = await response.json();
            onAdd(newLocation);
            onClose();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleCityAdded = (newCity) => {
        setCities((prevCities) => [...prevCities, newCity]);
        setIsPopupOpenCity(false);
    };

    const handleOpenPopupCity = () => {
        setIsPopupOpenCity(true);
    };

    const handleClosePopupCity = () => {
        setIsPopupOpenCity(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter un Lieu</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleAddLocation}>
                    <input
                        type="text"
                        id="street"
                        placeholder="Rue"
                        onChange={handleChange}
                        required
                    />

                    <div className="person-selection">
                        <select id="city" value={locationData.city} onChange={handleChange} required>
                            <option value="">Sélectionner une ville</option>
                            {cities.map((city) => (
                                <option key={city._id} value={city.name}>
                                    {city.name} ({city.country})
                                </option>
                            ))}
                        </select>
                        <button type="button" className="button small-button" onClick={handleOpenPopupCity}>
                            Ajouter une ville
                        </button>
                    </div>

                    <input
                        type="number"
                        id="lat"
                        placeholder="Latitude"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        id="lon"
                        placeholder="Longitude"
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="popup-button">
                        Enregistrer
                    </button>
                </form>
            </div>

            {isPopupOpenCity && (
                <AddCityPopup onClose={handleClosePopupCity} onAdd={handleCityAdded} />
            )}
        </div>
    );
};

export default AddLocationPopup;

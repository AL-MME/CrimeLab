import React, {useEffect, useState} from "react";
import AddLocationPopup from "./popUpAddLocation";

const AddPersonPopup = ({ onClose, onAdd, onAddLocation}) => {
    const [personData, setPersonData] = useState({
        firstname: "",
        lastname: "",
        age: "",
        location: "",
    });
    const [allLocations, setAllLocations] = useState([]);
    const [isPopupOpenLocation, setIsPopupOpenLocation] = useState(false);
    const [ageError, setAgeError] = useState("");
    const [allcities, setAllcities] = useState([]);

    const API_URL = process.env.REACT_APP_API_URL;


    const handleChange = (e) => {

        const { id, value } = e.target;
        setPersonData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(`${API_URL}/locations`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des lieux");
                const data = await response.json();
                setAllLocations(data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await fetch(`${API_URL}/cities`);
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des villes");
                }
                const data = await response.json();
                setAllcities(data);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };


        fetchLocations();
        fetchCities();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (personData.age < 0) {
            setAgeError("L'age doit etre suppérieur à 0");
            return;
        } else {
            setAgeError("");
        }

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

    const handleAddLocation = (newLocation) => {
        setAllLocations((prevLocations) => [...prevLocations, newLocation]);
        onAddLocation(newLocation);
        setIsPopupOpenLocation(false);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter une Personne</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <input type="text" id="firstname" placeholder="Prénom" onChange={handleChange} required />
                    <input type="text" id="lastname" placeholder="Nom" onChange={handleChange} required />
                    <div>
                        <input type="number" id="age" placeholder="Âge" min="0" onChange={handleChange} required />
                        {ageError && <p className="error-message">{ageError}</p>}
                    </div>
                    <input type="tel" id="phone" placeholder="Numéro de téléphone" onChange={handleChange} pattern="0[0-9]{9}" required />
                    <div className="person-selection">
                        <select id="location" onChange={handleChange} required>
                            <option value="">Sélectionnez un lieu</option>
                            {allLocations.map((location) => {
                                const city = allcities.find(city => city._id === location.city);
                                return (
                                    <option key={location._id} value={location._id}>
                                        {location.street}, {city ? city.name : "Ville inconnue"}
                                    </option>
                                );
                            })}
                            </select>
                        <button type="button" className="button small-button" onClick={() => setIsPopupOpenLocation(true)}>
                            Ajouter
                        </button>
                    </div>
                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
            {isPopupOpenLocation && <AddLocationPopup onClose={() => setIsPopupOpenLocation(false)} onAdd={handleAddLocation} />}
        </div>
    );
};

export default AddPersonPopup;
import React, { useState, useEffect } from "react";
import AddPersonPopup from "./popUpAddPerson";

const API_URL = process.env.REACT_APP_API_URL;

const AddTestimoniesPopup = ({ onClose, onAdd, selectedPersonIds}) => {
    const [formData, setFormData] = useState({
        person: "",
        description: "",
        date: "",
    });

    const [allPersons, setAllPersons] = useState([]);
    const [dateError, setDateError] = useState("");

    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        try {
            const response = await fetch(`${API_URL}/persons/get/byIds`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedPersonIds),
            });

            if (!response.ok) throw new Error("Erreur lors de la récupération des personnes");
            const personsData = await response.json();
            setAllPersons(personsData);
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmitTestimonie = async (e) => {
        e.preventDefault();

        const today = new Date().toISOString();
        formData.date = today;
        try {
            const response = await fetch(`${API_URL}/testimonies`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de la création du témoignage");
            }

            const newTestimonie = await response.json();
            onAdd(newTestimonie);
            onClose();
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter un Témoignage</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmitTestimonie}>
                    <label>Personne :</label>
                    <div className="person-selection">
                        <select id="person" value={formData.person} onChange={handleChange} required>
                            <option value="">Sélectionnez une personne</option>
                            {allPersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <label>Description :</label>
                    <textarea id="description" value={formData.description} onChange={handleChange} required />

                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddTestimoniesPopup;

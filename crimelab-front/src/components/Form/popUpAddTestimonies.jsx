import React, { useState, useEffect } from "react";
import AddPersonPopup from "./popUpAddPerson"; // Importation de la popup d'ajout de personne

const API_URL = process.env.REACT_APP_API_URL;

const AddTestimoniesPopup = ({ onClose, onAdd, onAddPerson }) => {
    const [formData, setFormData] = useState({
        person: "",
        description: "",
        date: "",
    });

    const [allPersons, setAllPersons] = useState([]);
    const [isPopupOpenPerson, setIsPopupOpenPerson] = useState(false);
    useEffect(() => {
        fetchPersons();
    }, []);

    const fetchPersons = async () => {
        try {
            const response = await fetch(`${API_URL}/persons`);
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

    const handleOpenPopupPerson = () => {
        setIsPopupOpenPerson(true);
    };

    const handleClosePopupPerson = () => {
        setIsPopupOpenPerson(false);
    };

    const handleAddPerson = (newPerson) => {
        setAllPersons((prevPersons) => [...prevPersons, newPerson]);
        setFormData((prevData) => ({
            ...prevData,
            person: newPerson._id,
        }));

        if (onAddPerson) {
            onAddPerson(newPerson);
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
                        <button type="button" className="button small-button" onClick={handleOpenPopupPerson}>
                            Ajouter une Personne
                        </button>
                    </div>

                    <label>Description :</label>
                    <textarea id="description" value={formData.description} onChange={handleChange} required />

                    <label>Date :</label>
                    <input type="date" id="date" value={formData.date} onChange={handleChange} required />

                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>

            {isPopupOpenPerson && (
                <AddPersonPopup onClose={handleClosePopupPerson} onAdd={handleAddPerson} />
            )}
        </div>
    );
};

export default AddTestimoniesPopup;

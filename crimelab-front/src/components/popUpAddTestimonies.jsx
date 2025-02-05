import React, { useState } from "react";

const AddTestimoniesPopup = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        case: "",
        person: "",
        description: "",
        date: "",
    });

    // Données en dur pour les select
    const caseOptions = [
        { id: 1, name: "Affaire 1" },
        { id: 2, name: "Affaire 2" },
        { id: 3, name: "Affaire 3" },
    ];

    const personOptions = [
        { id: 1, name: "Personne 1" },
        { id: 2, name: "Personne 2" },
        { id: 3, name: "Personne 3" },
    ];

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Ajouter un Témoignage</h2>
                <button className="popup-close" onClick={onClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <label>Affaire :</label>
                    <select id="case" value={formData.case} onChange={handleChange} required>
                        <option value="">Sélectionnez une affaire</option>
                        {caseOptions.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <label>Personne :</label>
                    <select id="person" value={formData.person} onChange={handleChange} required>
                        <option value="">Sélectionnez une personne</option>
                        {personOptions.map((p) => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>

                    <label>Description :</label>
                    <textarea id="description" placeholder="Description" onChange={handleChange} required />

                    <label>Date :</label>
                    <input type="date" id="date" onChange={handleChange} required />

                    <button type="submit" className="popup-button">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AddTestimoniesPopup;
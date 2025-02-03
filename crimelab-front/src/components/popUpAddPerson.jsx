import React, { useState } from "react";

const AddPersonPopup = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({ firstName: "", lastName: "", age: "" });
    const [isSaved, setIsSaved] = useState(false);

    // Gérer les changements dans les champs d'entrée
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Sauvegarder les données
    const handleSave = () => {
        if (formData.firstName && formData.lastName && formData.age) {
            setIsSaved(true); // Marquer comme sauvegardé
            onAdd(formData); // Appeler la fonction passée en prop pour transmettre les données
        } else {
            alert("Veuillez remplir tous les champs avant d'enregistrer.");
        }
    };

    // Fermer la popup et réinitialiser l'état
    const handleClose = () => {
        setIsSaved(false);
        setFormData({ firstName: "", lastName: "", age: "" });
        onClose();
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h3>Ajouter une victime</h3>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Âge"
                    value={formData.age}
                    onChange={handleInputChange}
                />

                <div className="popup-buttons">
                    {isSaved ? (
                        // Afficher le bouton "Fermer" après l'enregistrement
                        <button onClick={handleClose}>Fermer</button>
                    ) : (
                        // Afficher le bouton "Enregistrer" avant l'enregistrement
                        <button onClick={handleSave}>Enregistrer</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPersonPopup;

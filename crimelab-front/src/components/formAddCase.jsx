import React, { useState } from "react";
import AddPersonPopup from "./popUpAddPerson"; // Importer le composant Popup
import "../css/form.css";

const FormAddCase = () => {
    const [formData, setFormData] = useState({
        crimeName: "",
        date: "",
        lieu: "",
        temoins: "",
        suspect: "",
        victime: "",
        description: "",
    });

    const [victims, setVictims] = useState([]); // Liste des victimes
    const [isPopupOpen, setIsPopupOpen] = useState(false); // État pour afficher ou cacher la popup

    // Gestion des changements de formulaire
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    // Gestion de l'ouverture de la popup
    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    // Gestion de la fermeture de la popup
    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    // Gestion de l'ajout d'une victime
    const handleAddVictim = (victimData) => {
        setVictims((prevVictims) => [...prevVictims, victimData]); // Ajouter la victime à la liste
        setIsPopupOpen(false); // Fermer la popup
    };

    // Soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", { ...formData, victims });
    };

    return (
        <div className="page-container">
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="label">
                        <label>Nom du crime</label>
                        <input
                            type="text"
                            id="crimeName"
                            className="crime-name"
                            placeholder="Nom du crime"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="description"
                            placeholder="Décrivez le crime ici..."
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="testt">
                        <div className="label">
                            <label>Date</label>
                            <input
                                type="date"
                                id="date"
                                className="date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="label">
                            <label htmlFor="lieu">Lieu</label>
                            <div className="test">
                                <select
                                    id="lieu"
                                    className="witness"
                                    onChange={handleChange}
                                >
                                    <option value="lieu1">Lieu 1</option>
                                    <option value="lieu2">Lieu 2</option>
                                    <option value="lieu3">Lieu 3</option>
                                    <option value="lieu4">Lieu 4</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="testt">
                        <div className="label">
                            <label htmlFor="victime">Victimes</label>
                            <ul>
                                {victims.map((victim, index) => (
                                    <li key={index}>
                                        {victim.firstName} {victim.lastName}, {victim.age} ans
                                    </li>
                                ))}
                            </ul>
                            <button
                                type="button"
                                className="button"
                                onClick={handleOpenPopup} // Ouvre la popup
                            >
                                Ajouter une victime
                            </button>
                        </div>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="button">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>

            {isPopupOpen && (
                <AddPersonPopup
                    onClose={handleClosePopup} // Fermer la popup
                    onAdd={handleAddVictim} // Ajouter une victime
                />
            )}
        </div>
    );
};

export default FormAddCase;

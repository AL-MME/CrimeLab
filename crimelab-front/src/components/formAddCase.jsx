import React, { useState } from "react";
import AddPersonPopup from "./popUpAddPerson";
import AddLocationPopup from "./popUpAddLocation";
import "../css/form.css";

const FormAddCase = () => {
    const [formData, setFormData] = useState({
        crimeName: "",
        date: "",
        lieu: "",
        temoins: "",
        suspect: "",
        description: "",
    });

    //const API_URL = process.env.API_URL;

    const [victims, setVictims] = useState([]);
    const [temoins, setTemoins] = useState([]);
    const [suspects, setSuspects] = useState([]);
    const [allPersons, setAllPersons] = useState([
        { _id: "1", firstname: "Jean", lastname: "Dupont", age: 30 },
        { _id: "2", firstname: "Marie", lastname: "Curie", age: 45 },
        { _id: "3", firstname: "Albert", lastname: "Einstein", age: 50 },
        { _id: "4", firstname: "Isaac", lastname: "Newton", age: 60 },
    ]);
    const [allPlaces, setAllPlaces] = useState([
        "Lieu 1", "Lieu 2", "Lieu 3", "Lieu 4"
    ]);
    const [allTestimonies, setAllTestimonies] = useState([
        { _id: "1", case: 1, person: 1, age: 30 },
        { _id: "2", case: 2, person: 2, age: 45 },
        { _id: "3", case: 2, person: 3, age: 50 },
        { _id: "4", case: 1, person: 4, age: 60 },
    ]);
    const [isPopupOpenPerson, setIsPopupOpenPerson] = useState(false);
    const [isPopupOpenLocation, setIsPopupOpenLocation] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleOpenPopupPerson = () => setIsPopupOpenPerson(true);
    const handleClosePopupPerson = () => setIsPopupOpenPerson(false);

    const handleOpenPopupLocation = () => setIsPopupOpenLocation(true);
    const handleClosePopupLocation = () => setIsPopupOpenLocation(false);

    const handleAddVictim = (victimData) => {
        const newVictim = {
            _id: (allPersons.length + 1).toString(),
            ...victimData,
        };

        setVictims((prevVictims) => [...prevVictims, newVictim]);
        setAllPersons((prevPersons) => [...prevPersons, newVictim]);
        setIsPopupOpenPerson(false);
    };

    /*const handleAddVictim = async (victimData) => {
        try {
            const response = await fetch('http://localhost:3001/persons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(victimData),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la création de la victime');
            }
            const newVictim = await response.json();
            setVictims((prevVictims) => [...prevVictims, newVictim]);
            setIsPopupOpenPerson(false);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };*/

    /*const handleAddVictim = async (victimData) => {
        try {
            const response = await fetch('${API_URL}persons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(victimData),
            });
            if (!response.ok) {
                throw new Error('Erreur lors de la création de la victime');
            }
            const newVictim = await response.json();
            setVictims((prevVictims) => [...prevVictims, newVictim]);
            setIsPopupOpenPerson(false);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };*/

    const handleAddWitness = (witnessData) => {
        const newWitness = {
            _id: (allPersons.length + 1).toString(),
            ...witnessData,
        };

        setTemoins((prevTemoins) => [...prevTemoins, newWitness]);
        setAllPersons((prevPersons) => [...prevPersons, newWitness]);
        setIsPopupOpenPerson(false);
    };

    const handleAddSuspect = (suspectData) => {
        const newSuspect = {
            _id: (allPersons.length + 1).toString(),
            ...suspectData,
        };

        setSuspects((prevSuspects) => [...prevSuspects, newSuspect]);
        setAllPersons((prevPersons) => [...prevPersons, newSuspect]);
        setIsPopupOpenPerson(false);
    };

    const handleSelectVictim = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !victims.some(v => v._id === selectedPersonId)) {
            setVictims([...victims, selectedPerson]);
        }
    };

    const handleSelectWitness = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !temoins.some(t => t._id === selectedPersonId)) {
            setTemoins([...temoins, selectedPerson]);
        }
    };

    const handleSelectSuspect = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !suspects.some(s => s._id === selectedPersonId)) {
            setSuspects([...suspects, selectedPerson]);
        }
    };

    const handleRemoveVictim = (victimId) => {
        setVictims(victims.filter(victim => victim._id !== victimId));
    };

    const handleRemoveWitness = (witnessId) => {
        setTemoins(temoins.filter(witness => witness._id !== witnessId));
    };

    const handleRemoveSuspect = (suspectId) => {
        setSuspects(suspects.filter(suspect => suspect._id !== suspectId));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", { ...formData, victims, temoins, suspects });
    };

    return (
        <div className="page-container">
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="crime-date-container">
                        <div className="label">
                            <label>Nom du crime</label>
                            <input
                                type="text"
                                id="crimeName"
                                className="crime-name"
                                placeholder="Nom du crime"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="label">
                            <label>Date</label>
                            <input
                                type="date"
                                id="date"
                                className="date"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="label">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="description"
                            placeholder="Décrivez le crime ici..."
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>

                    <div className="person-container">
                        <label>Lieu</label>
                        <div className="person-selection">
                            <select id="lieu" className="witness" onChange={handleChange} required>
                                <option value="">Sélectionnez un lieu</option>
                                {allPlaces.map((place, index) => (
                                    <option key={index} value={place}>
                                        {place}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button" onClick={handleOpenPopupLocation}>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <div className="person-container">
                        <label>Victimes</label>
                        <div className="person-selection">
                            <select onChange={handleSelectVictim} className="person-select">
                                <option value="">Sélectionnez une victime</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <ul className="selected-person">
                        {victims.map((victim) => (
                            <li key={victim._id}>
                                {victim.firstname} {victim.lastname}, {victim.age} ans
                                <button type="button" onClick={() => handleRemoveVictim(victim._id)}>
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="person-container">
                        <label>Témoins</label>
                        <div className="person-selection">
                            <select onChange={handleSelectWitness} className="person-select">
                                <option value="">Sélectionnez un témoin</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <ul className="selected-person">
                        {temoins.map((witness) => (
                            <li key={witness._id}>
                                {witness.firstname} {witness.lastname}, {witness.age} ans
                                <button type="button" onClick={() => handleRemoveWitness(witness._id)}>
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="person-container">
                        <label>Suspects</label>
                        <div className="person-selection">
                            <select onChange={handleSelectSuspect} className="person-select">
                                <option value="">Sélectionnez un suspect</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <ul className="selected-person">
                        {suspects.map((suspect) => (
                            <li key={suspect._id}>
                                {suspect.firstname} {suspect.lastname}, {suspect.age} ans
                                <button type="button" onClick={() => handleRemoveSuspect(suspect._id)}>
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="person-container">
                        <label>Témoignage</label>
                        <div className="person-selection">
                            <select onChange={handleSelectWitness} className="person-select">
                                <option value="">Sélectionnez un témoignage</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>

                    <ul className="selected-person">
                        {temoins.map((witness) => (
                            <li key={witness._id}>
                                {witness.firstname} {witness.lastname}, {witness.age} ans
                                <button type="button" onClick={() => handleRemoveWitness(witness._id)}>
                                    ❌
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="button-container">
                        <button type="submit" className="button">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>

            {isPopupOpenPerson && <AddPersonPopup onClose={handleClosePopupPerson} onAdd={handleAddVictim} />}
            {isPopupOpenLocation && <AddLocationPopup onClose={handleClosePopupLocation} onAdd={handleAddVictim} />}

        </div>
    );
};

export default FormAddCase;

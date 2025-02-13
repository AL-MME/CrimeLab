import React, { useState, useEffect } from "react";
import AddPersonPopup from "./popUpAddPerson";
import AddLocationPopup from "./popUpAddLocation";
import "../../css/form.css";
import AddTestimoniesPopup from "./popUpAddTestimonies";
import {useNavigate} from "react-router-dom";

const FormAddCase = () => {
    const [formData, setFormData] = useState({
        crimeName: "",
        date: "",
        lieu: "",
        description: "",
    });

    const navigate = useNavigate();

    const API_URL = process.env.REACT_APP_API_URL;

    const [victims, setVictims] = useState([]);
    const [suspects, setSuspects] = useState([]);
    const [witnesses, setWitnesses] = useState([]);
    const [testimonies, setTestimonies] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [allPersons, setAllPersons] = useState([]);
    const [allLocations, setAllLocations] = useState([]);
    const [allTestimonies, setAllTestimonies] = useState([]);
    const [isPopupOpenPerson, setIsPopupOpenPerson] = useState(false);
    const [isPopupOpenLocation, setIsPopupOpenLocation] = useState(false);
    const [isPopupOpenTestimonie, setIsPopupOpenTestimonie] = useState(false);

    const handleOpenPopupPerson = () => setIsPopupOpenPerson(true);
    const handleClosePopupPerson = () => setIsPopupOpenPerson(false);
    const handleOpenPopupLocation = () => setIsPopupOpenLocation(true);
    const handleClosePopupLocation = () => setIsPopupOpenLocation(false);
    const handleOpenPopupTestimonie = () => setIsPopupOpenTestimonie(true);
    const handleClosePopupTestimonie = () => setIsPopupOpenTestimonie(false);

    useEffect(() => {
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

        const fetchLocations = async () => {
            try {
                const response = await fetch(`${API_URL}/locations`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des lieux");
                const locationsData = await response.json();
                setAllLocations(locationsData);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        const fetchTestimonies = async () => {
            try {
                const response = await fetch(`${API_URL}/testimonies/get/noCase`);
                if (!response.ok) throw new Error("Erreur lors de la récupération des témoignages");
                const testimonies = await response.json();
                setAllTestimonies(testimonies);
            } catch (error) {
                console.error("Erreur:", error);
            }
        };

        fetchPersons();
        fetchLocations();
        fetchTestimonies();
    }, [API_URL]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleAddPerson = (newPerson) => {
        setAllPersons((prevPersons) => [...prevPersons, newPerson]);
    };

    const handleAddLocation = (newLocation) => {
        setAllLocations((prevLocations) => [...prevLocations, newLocation]);
    };

    const handleAddTestimonie = (newTestimonie) => {
        setAllTestimonies((prevTestimonies) => [...prevTestimonies, newTestimonie]);
        setTestimonies((prevTestimonies) => [...prevTestimonies, newTestimonie]); // Ajout immédiat dans la sélection
    };

    const handleSelectVictim = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !victims.some(v => v._id === selectedPersonId)) {
            setVictims([...victims, selectedPerson]);
        }
    };

    const handleSelectSuspect = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !suspects.some(s => s._id === selectedPersonId)) {
            setSuspects([...suspects, selectedPerson]);
        }
    };

    const handleSelectTestimonies = (e) => {
        const selectedTestimonieId = e.target.value;
        const selectedTestimonie = allTestimonies.find(testimonie => testimonie._id === selectedTestimonieId);

        if (selectedTestimonie && !testimonies.some(t => t._id === selectedTestimonieId)) {
            setTestimonies([...testimonies, selectedTestimonie]);
        }
    };

    const handleSelectWitness = (e) => {
        const selectedPersonId = e.target.value;
        const selectedPerson = allPersons.find(person => person._id === selectedPersonId);

        if (selectedPerson && !witnesses.some(w => w._id === selectedPersonId)) {
            setWitnesses([...witnesses, selectedPerson]);
        }
    };

    const handleRemoveVictim = (victimId) => {
        setVictims(victims.filter(victim => victim._id !== victimId));
    };

    const handleRemoveSuspect = (suspectId) => {
        setSuspects(suspects.filter(suspect => suspect._id !== suspectId));
    };

    const handleRemoveWitness = (witnessId) => {
        setWitnesses(witnesses.filter(witness => witness._id !== witnessId));
    };

    const handleRemoveTestimonie = (testimonieId) => {
        setTestimonies(testimonies.filter(testimonie => testimonie._id !== testimonieId));
    };

    const handleSelectLocation = (e) => {
        const locationId = e.target.value;
        const location = allLocations.find(loc => loc._id === locationId);
        setSelectedLocation(location);
        setFormData((prevData) => ({
            ...prevData,
            lieu: locationId,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const caseData = {
            type: formData.crimeName,
            description: formData.description,
            date: formData.date,
            location: selectedLocation ? selectedLocation._id : null,
            suspects: suspects.map(s => s._id),
            witnesses: witnesses.map(w => w._id),
            victims: victims.map(v => v._id),
            testimonies: testimonies.map(t => t._id),
        };

        console.log(caseData);

        try {
            const response = await fetch(`${API_URL}/cases`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(caseData),
            });

            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du dossier.");
            }

            const newCase = await response.json();
            console.log("Affaire ajoutée:", newCase);

            const caseId = newCase._id;  // L'ID du cas nouvellement créé

            for (const testimonie of testimonies) {
                await updateTestimonieWithCaseId(testimonie._id, caseId);
            }

            setFormData({
                crimeName: "",
                date: "",
                lieu: "",
                description: "",
            });
            setVictims([]);
            setSuspects([]);
            setWitnesses([]);
            setTestimonies([]);
            setSelectedLocation(null);
            navigate(`/`)
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    const updateTestimonieWithCaseId = async (testimonieId, caseId) => {
        try {
            const response = await fetch(`${API_URL}/testimonies/${testimonieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    case: caseId,
                }),
            });

            if (!response.ok) {
                throw new Error(`Erreur lors de la mise à jour du témoignage ${testimonieId}`);
            }

            const updatedTestimonie = await response.json();
            console.log("updatedTestimonie : ", updatedTestimonie)
            console.log("Témoignage mis à jour:", updatedTestimonie);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du témoignage:", error);
        }
    };

    return (
        <div className="page-container">
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <button
                        type="button"
                        className="close-button"
                        onClick={() => navigate(`/`)}
                    >
                        ❌
                    </button>

                    <div className="testt">
                        <div className="label">
                            <label>Nom du crime</label>
                            <input type="text" id="crimeName" onChange={handleChange} required />
                        </div>
                        <div className="label">
                            <label>Date</label>
                            <input type="date" id="date" onChange={handleChange} required />
                        </div>
                    </div>


                    <div className="person-container">
                        <label>Lieu</label>
                        <div className="person-selection">
                            <select id="lieu" onChange={handleSelectLocation} required>
                                <option value="">Sélectionnez un lieu</option>
                                {allLocations.map((location) => (
                                    <option key={location._id} value={location._id}>{location.street}</option>
                                ))}
                            </select>
                            <button type="button" className="button small-button" onClick={handleOpenPopupLocation}>
                                Ajouter
                            </button>
                        </div>
                    </div>



                    <div className="label">
                        <label>Description</label>
                        <textarea id="description" onChange={handleChange} required></textarea>
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
                            <button type="button" className="button small-button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <ul className="selected-person">
                        {victims.map((victim) => (
                            <li key={victim._id}>
                                {victim.firstname} {victim.lastname}
                                <button type="button" onClick={() => handleRemoveVictim(victim._id)}>❌</button>
                            </li>
                        ))}


                    </ul>

                    <div className="person-container">
                        <label>Suspect</label>
                        <div className="person-selection">
                            <select onChange={handleSelectSuspect} className="person-select">
                                <option value="">Sélectionnez un suspect</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button small-button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <ul className="selected-person">
                        {suspects.map((suspect) => (
                            <li key={suspect._id}>
                                {suspect.firstname} {suspect.lastname}
                                <button type="button" onClick={() => handleRemoveSuspect(suspect._id)}>❌</button>
                            </li>
                        ))}
                    </ul>

                    <div className="person-container">
                        <label>Témoins</label>
                        <div className="person-selection">
                            <select onChange={handleSelectWitness} className="person-select">
                                <option value="">Sélectionnez un témoins</option>
                                {allPersons.map((person) => (
                                    <option key={person._id} value={person._id}>
                                        {person.firstname} {person.lastname}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button small-button" onClick={handleOpenPopupPerson}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <ul className="selected-person">
                        {witnesses.map((witness) => (
                            <li key={witness._id}>
                                {witness.firstname} {witness.lastname}
                                <button type="button" onClick={() => handleRemoveWitness(witness._id)}>❌</button>
                            </li>
                        ))}
                    </ul>

                    <div className="person-container">
                        <label>Témoignage</label>
                        <div className="person-selection">
                            <select onChange={handleSelectTestimonies} className="person-select">
                                <option value="">Sélectionnez un Témoignage</option>
                                {allTestimonies.map((testimonie) => (
                                    <option key={testimonie._id} value={testimonie._id}>
                                        {testimonie.description}
                                    </option>
                                ))}
                            </select>
                            <button type="button" className="button small-button" onClick={handleOpenPopupTestimonie}>
                                Ajouter
                            </button>
                        </div>
                    </div>
                    <ul className="selected-person">
                        {testimonies.map((testimonie) => (
                            <li key={testimonie._id}>
                                {testimonie.description}
                                <button type="button" onClick={() => handleRemoveTestimonie(testimonie._id)}>❌</button>
                            </li>
                        ))}
                    </ul>

                    <div className="button-container">
                        <button type="submit" className="button">Ajouter</button>
                    </div>
                </form>
            </div>

            {isPopupOpenPerson && <AddPersonPopup onClose={handleClosePopupPerson} onAdd={handleAddPerson} onAddLocation={handleAddLocation} />}
            {isPopupOpenLocation && <AddLocationPopup onClose={handleClosePopupLocation} onAdd={handleAddLocation} />}
            {isPopupOpenTestimonie && (<AddTestimoniesPopup onClose={handleClosePopupTestimonie} onAdd={handleAddTestimonie} onAddPerson={handleAddPerson}/>)}
        </div>
    );
};

export default FormAddCase;

import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function CrimeEdition() {
    const [crimeData, setCrimeData] = useState({
        type: '',
        description: '',
        date: '',
        location: '',
        suspects: [],
        witnesses: [],
        victims: [],
        testimonies: []
    });
    const [availableLocations, setAvailableLocations] = useState([]);
    const [availablePersons, setAvailablePersons] = useState([]);
    const [availableTestimonies, setAvailableTestimonies] = useState([]);

    useEffect(() => {
        fetchData();
        fetchLocations();
        fetchPersons();
        fetchTestimonies();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cases/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setCrimeData({
                ...data,
                date: data.date ? new Date(data.date).toISOString().split('T')[0] : ''
            });
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/locations`);

            if (!response.ok) {
                console.error("Error fetching locations");
                return;
            }

            const data = await response.json();
            setAvailableLocations(data);
        } catch (error) {
            console.error("Erreur de récupération des locations :", error);
        }
    };

    const fetchPersons = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/persons`);

            if (!response.ok) {
                console.error("Error fetching persons");
                return;
            }

            const data = await response.json();
            setAvailablePersons(data);
        } catch (error) {
            console.error("Erreur de récupération des personnes :", error);
        }
    };

    const fetchTestimonies = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/testimonies`);

            if (!response.ok) {
                console.error("Error fetching testimonies");
                return;
            }

            const data = await response.json();
            setAvailableTestimonies(data);
        } catch (error) {
            console.error("Erreur de récupération des témoignages :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCrimeData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleMultiSelectChange = (e, field) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setCrimeData(prevState => ({
            ...prevState,
            [field]: selectedOptions
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data to send :", crimeData);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cases/${crimeData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...crimeData,
                    date: new Date(crimeData.date).toISOString()
                })
            });

            if (!response.ok) {
                console.error("Error updating data");
                return;
            }

            window.location.href = '/details';

        } catch (error) {
            console.error("Erreur de mise à jour :", error);
        }
    };

    return (
        <div className={'form-background'}>
            <div className="node-edition scrollable">
                <h1>Edit Crime</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <input
                            type="text"
                            id="type"
                            name="type"
                            value={crimeData.type || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={crimeData.description || ''}
                            onChange={handleInputChange}
                            rows={5}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={crimeData.date || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select
                            name="location"
                            id="location"
                            value={crimeData.location || ''}
                            onChange={(e) => handleInputChange(e)}
                        >
                            <option value="" disabled>Select a location</option>
                            {availableLocations.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.street}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="suspects">Suspects</label>
                        <select
                            name="suspects"
                            id="suspects"
                            multiple
                            value={crimeData.suspects || []}
                            onChange={(e) => handleMultiSelectChange(e, 'suspects')}
                        >
                            {availablePersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                        <div className="selected-items">
                            {crimeData.suspects.map((suspectId) => {
                                const suspect = availablePersons.find(person => person._id === suspectId);
                                return (
                                    <div key={suspectId} className="selected-item">
                                        <span>{suspect?.firstname} {suspect?.lastname}</span>
                                        <button
                                            type="button"
                                            onClick={() => setCrimeData(prevState => ({
                                                ...prevState,
                                                suspects: prevState.suspects.filter(id => id !== suspectId)
                                            }))}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="victims">Victims</label>
                        <select
                            name="victims"
                            id="victims"
                            multiple
                            value={crimeData.victims || []}
                            onChange={(e) => handleMultiSelectChange(e, 'victims')}
                        >
                            {availablePersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                        <div className="selected-items">
                            {crimeData.victims.map((victimId) => {
                                const victim = availablePersons.find(person => person._id === victimId);
                                return (
                                    <div key={victimId} className="selected-item">
                                        <span>{victim?.firstname} {victim?.lastname}</span>
                                        <button
                                            type="button"
                                            onClick={() => setCrimeData(prevState => ({
                                                ...prevState,
                                                victims: prevState.victims.filter(id => id !== victimId)
                                            }))}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="witnesses">Witnesses</label>
                        <select
                            name="witnesses"
                            id="witnesses"
                            multiple
                            value={crimeData.witnesses || []}
                            onChange={(e) => handleMultiSelectChange(e, 'witnesses')}
                        >
                            {availablePersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                        <div className="selected-items">
                            {crimeData.witnesses.map((witnessId) => {
                                const witness = availablePersons.find(person => person._id === witnessId);
                                return (
                                    <div key={witnessId} className="selected-item">
                                        <span>{witness?.firstname} {witness?.lastname}</span>
                                        <button
                                            type="button"
                                            onClick={() => setCrimeData(prevState => ({
                                                ...prevState,
                                                witnesses: prevState.witnesses.filter(id => id !== witnessId)
                                            }))}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="testimonies">Testimonies</label>
                        <select
                            name="testimonies"
                            id="testimonies"
                            multiple
                            value={crimeData.testimonies || []}
                            onChange={(e) => handleMultiSelectChange(e, 'testimonies')}
                        >
                            {availableTestimonies.map((testimony) => (
                                <option key={testimony._id} value={testimony._id}>
                                    {testimony.description.substring(0, 50)}...
                                </option>
                            ))}
                        </select>
                        <div className="selected-items">
                            {crimeData.testimonies.map((testimonyId) => {
                                const testimony = availableTestimonies.find(t => t._id === testimonyId);
                                return (
                                    <div key={testimonyId} className="selected-item">
                                        <span>{testimony?.description.substring(0, 50)}...</span>
                                        <button
                                            type="button"
                                            onClick={() => setCrimeData(prevState => ({
                                                ...prevState,
                                                testimonies: prevState.testimonies.filter(id => id !== testimonyId)
                                            }))}
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CrimeEdition;
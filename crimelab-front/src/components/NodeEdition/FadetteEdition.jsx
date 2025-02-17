import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function FadetteEdition() {
    const [fadetteData, setFadetteData] = useState({
        date: '',
        duration: '',
        caller: '',
        receiver: '',
        type: 'call',
        relay: ''
    });
    const [availablePersons, setAvailablePersons] = useState([]);
    const [availableRelays, setAvailableRelays] = useState([]);

    useEffect(() => {
        fetchData();
        fetchPersons();
        fetchRelays();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/fadettes/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setFadetteData({
                ...data,
                date: data.date ? new Date(data.date).toISOString().split('T')[0] : ''
            });
        } catch (error) {
            console.error("Erreur de récupération :", error);
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

    const fetchRelays = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/relays`);

            if (!response.ok) {
                console.error("Error fetching relays");
                return;
            }

            const data = await response.json();
            setAvailableRelays(data);
        } catch (error) {
            console.error("Erreur de récupération des relays :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFadetteData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/fadettes/${fadetteData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...fadetteData,
                    date: new Date(fadetteData.date).toISOString()
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
            <div className="fadette-edition">
                <h1>Edit Fadette</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={fadetteData.date || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (minutes)</label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={fadetteData.duration || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            name="type"
                            id="type"
                            value={fadetteData.type || 'call'}
                            onChange={handleInputChange}
                        >
                            <option value="call">Call</option>
                            <option value="sms">SMS</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="caller">Caller</label>
                        <select
                            name="caller"
                            id="caller"
                            value={fadetteData.caller || ''}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a caller</option>
                            {availablePersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="receiver">Receiver</label>
                        <select
                            name="receiver"
                            id="receiver"
                            value={fadetteData.receiver || ''}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a receiver</option>
                            {availablePersons.map((person) => (
                                <option key={person._id} value={person._id}>
                                    {person.firstname} {person.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="relay">Relay</label>
                        <select
                            name="relay"
                            id="relay"
                            value={fadetteData.relay || ''}
                            onChange={handleInputChange}
                        >
                            <option value="" disabled>Select a relay</option>
                            {availableRelays.map((relay) => (
                                <option key={relay._id} value={relay._id}>
                                    {relay.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default FadetteEdition;
import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function RelayEdition() {
    const [relayData, setRelayData] = useState({
        name: '',
        location: ''
    });
    const [availableLocations, setAvailableLocations] = useState([]);

    useEffect(() => {
        fetchData();
        fetchLocations();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/relays/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setRelayData(data);
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRelayData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        setRelayData(prevState => ({
            ...prevState,
            location: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/relays/${relayData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(relayData)
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
            <div className="node-edition">
                <h1>Edit Relay</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={relayData.name || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select
                            name="location"
                            id="location"
                            value={relayData.location || ''}
                            onChange={handleLocationChange}
                        >
                            <option value="" disabled>Select a location</option>
                            {availableLocations.map((location) => (
                                <option key={location._id} value={location._id}>
                                    {location.street}
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

export default RelayEdition;
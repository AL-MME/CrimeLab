import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function PersonEdition() {
    const [personData, setPersonData] = useState(null);
    const [availableLocations, setAvailableLocations] = useState([]);
    const [selectedLocationId, setSelectedLocationId] = useState('');

    useEffect(() => {
        fetchData();
        fetchLocations();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/persons/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setPersonData(data);
            if (data.location) {
                setSelectedLocationId(data.location);
            }
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const fetchLocations = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/locations`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setAvailableLocations(data);
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPersonData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLocationChange = (e) => {
        setSelectedLocationId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/persons/${personData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...personData,
                    location: selectedLocationId
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
            <div className="node-edition">
                <h1>Edit Person</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="firstname">Firstname</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={personData?.firstname || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastname">Lastname</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={personData?.lastname || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={personData?.age || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="location">Location</label>
                        <select
                            name="location"
                            id="location"
                            value={selectedLocationId}
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

export default PersonEdition;
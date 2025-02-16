import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function LocationEdition() {
    const [locationData, setLocationData] = useState({
        street: '',
        city: '',
        lat: '',
        lon: ''
    });
    const [availableCities, setAvailableCities] = useState([]);

    useEffect(() => {
        fetchData();
        fetchCities();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/locations/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setLocationData(data);
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const fetchCities = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cities`);

            if (!response.ok) {
                console.error("Error fetching cities");
                return;
            }

            const data = await response.json();
            setAvailableCities(data);
        } catch (error) {
            console.error("Erreur de récupération des villes :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCityChange = (e) => {
        setLocationData(prevState => ({
            ...prevState,
            city: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/locations/${locationData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(locationData)
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
                <h1>Edit Location</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="street">Street</label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={locationData.street || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City</label>
                        <select
                            name="city"
                            id="city"
                            value={locationData.city || ''}
                            onChange={handleCityChange}
                        >
                            <option value="" disabled>Select a city</option>
                            {availableCities.map((city) => (
                                <option key={city._id} value={city._id}>
                                    {city.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="lat">Latitude</label>
                        <input
                            type="number"
                            id="lat"
                            name="lat"
                            value={locationData.lat || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lon">Longitude</label>
                        <input
                            type="number"
                            id="lon"
                            name="lon"
                            value={locationData.lon || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default LocationEdition;
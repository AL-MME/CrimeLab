import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function CityEdition() {
    const [cityData, setCityData] = useState({
        name: '',
        country: '',
        lat: '',
        lon: '',
        postal_code: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cities/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setCityData(data);
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCityData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/cities/${cityData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cityData)
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
                <h1>Edit City</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">City Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={cityData.name || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={cityData.country || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lat">Latitude</label>
                        <input
                            type="number"
                            id="lat"
                            name="lat"
                            value={cityData.lat || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lon">Longitude</label>
                        <input
                            type="number"
                            id="lon"
                            name="lon"
                            value={cityData.lon || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="postal_code">Postal Code</label>
                        <input
                            type="text"
                            id="postal_code"
                            name="postal_code"
                            value={cityData.postal_code || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default CityEdition;
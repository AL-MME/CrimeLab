import React, { useEffect, useState } from 'react';
import '../../css/NodeEdition/editNode.css';

function TestimonyEdition() {
    const [testimonyData, setTestimonyData] = useState({
        description: '',
        date: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const id = window.location.pathname.split("/")[3];
            const response = await fetch(`${process.env.REACT_APP_API_URL}/testimonies/${id}`);

            if (!response.ok) {
                console.error("Error fetching data");
                return;
            }

            const data = await response.json();
            setTestimonyData({
                ...data,
                date: data.date ? new Date(data.date).toISOString().split('T')[0] : ''
            });
        } catch (error) {
            console.error("Erreur de récupération :", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTestimonyData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/testimonies/${testimonyData._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...testimonyData,
                    date: new Date(testimonyData.date).toISOString()
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
                <h1>Edit Testimony</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={testimonyData.description || ''}
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
                            value={testimonyData.date || ''}
                            onChange={handleInputChange}
                        />
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default TestimonyEdition;
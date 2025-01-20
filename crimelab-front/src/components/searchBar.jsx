import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const SearchBar = ({ setResults, category }) => {
    const [input, setInput] = useState('');
    const [allData, setAllData] = useState([]); // Stocke toutes les données récupérées
    const [error, setError] = useState(null); // Stocke les erreurs éventuelles

    // Récupère les données lors du montage ou du changement de catégorie
    const fetchData = async () => {
        console.log(process.env.API_URL);
        try {
            const realCat = category === "GPS" ? "locations" : category;
            const response = await fetch(`${process.env.REACT_APP_API_URL}/${realCat}`);
            if (!response.ok) throw new Error(`Erreur : Impossible de récupérer les données pour la catégorie ${realCat}`);
            const data = await response.json();

            setAllData(data); // Stocke toutes les données pour le filtrage local
            filterResults(input, data); // Filtre directement en cas d'input déjà présent
        } catch (err) {
            console.error("Erreur de récupération :", err);
            setError(err.message);
        }
    };

    // Filtre les résultats en fonction de l'entrée utilisateur
    const filterResults = (value, data = allData) => {
        const filtered = data.filter((item) => {
            switch (category) {
                case "persons":
                    return `${item.firstname} ${item.lastname}`.toLowerCase().includes(value.toLowerCase());
                case "locations":
                    return item.street.toLowerCase().includes(value.toLowerCase());
                case "cities":
                    return item.name.toLowerCase().includes(value.toLowerCase());
                case "relays":
                    return item.name.toLowerCase().includes(value.toLowerCase());
                case "cases":
                    return item.type.toLowerCase().includes(value.toLowerCase());
                default:
                    return false;
            }
        });

        const formattedResults = filtered.map((item) => {
            switch (category) {
                case "persons":
                    return `Name: ${item.firstname} ${item.lastname}, ID: ${item._id}`;
                case "locations":
                    return `Street: ${item.street}, ID: ${item._id}`;
                case "cities":
                    return `City: ${item.name}, ID: ${item._id}`;
                case "relays":
                    return `Relay: ${item.name}, ID: ${item._id}`;
                case "cases":
                    return `Case Type: ${item.type}, Date: ${item.date}, ID: ${item._id}`;
                default:
                    return "Invalid category";
            }
        });

        setResults(formattedResults);
    };

    // Gère les modifications de l'input utilisateur
    const handleInputChange = (value) => {
        setInput(value);
        filterResults(value); // Filtre localement sans nouvel appel API
    };

    // Appelle fetchData lors du montage ou du changement de catégorie
    useEffect(() => {
        fetchData();
    }, [category]);

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
            />
            <FaSearch id="search-icon" />
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default SearchBar;

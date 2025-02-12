import { FaSearch } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import {CategoryAdapter} from "../utils/categoryAdapter";

const SearchBar = ({ setResults, category }) => {
    const [input, setInput] = useState('');
    const [allData, setAllData] = useState([]);

    const filterResults = (value, data = allData) => {
        if (value === "") return setResults([]);
        const filtered = data.filter((item) => {
            switch (category) {
                case "Person":
                    return `${item.firstname} ${item.lastname}`.toLowerCase().includes(value.toLowerCase());
                case "Location":
                    return item.street.toLowerCase().includes(value.toLowerCase());
                case "City":
                    return item.name.toLowerCase().includes(value.toLowerCase());
                case "Relay":
                    return item.name.toLowerCase().includes(value.toLowerCase());
                case "Case":
                    return `${item.type} ${item.date}`.toLowerCase().includes(value.toLowerCase());
                default:
                    return false;
            }
        });

        const formattedResults = filtered.map((item) => {
            switch (category) {
                case "Person":
                    return { name: `${item.firstname} ${item.lastname}`, id: item._id };
                case "Location":
                    return { name: `${item.street}`, id: item._id };
                case "City":
                    return { name: `${item.name}`, id: item._id };
                case "Relay":
                    return { name: `${item.name}`, id: item._id };
                case "Case":
                    const formattedDate = new Date(item.date).toLocaleDateString('fr-FR');
                    return { name: `${item.type} - ${formattedDate}`, id: item._id };
                default:
                    return "Invalid category";
            }
        });

        setResults(formattedResults);
    };

    const handleInputChange = (value) => {
        setInput(value);
        filterResults(value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const realCat = category === "GPS" ? "locations" : category;
                const response = await fetch(`${process.env.REACT_APP_API_URL}/${CategoryAdapter.adaptCategory(category)}`);
                if (!response.ok) throw new Error(`Erreur : Impossible de récupérer les données pour la catégorie ${realCat}`);
                const data = await response.json();

                setAllData(data);
            } catch (err) {
                console.error("Erreur de récupération :", err);
            }
        };
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
        </div>
    );
};

export default SearchBar;

import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const SearchBar = (category) => {
    const [input, setInput] = useState('');

    const fetchData = async () => {
        const realCat = category == "GPS" ? category = "locations" : category = category;
        const response = await fetch(`${process.env.API_URL}/${realCat}`);
        const data = await response.json();
        switch (realCat) {
            case "persons":
                return data.filter((person) => {
                    return `${person.firstname} ${person.lastname}` && person._id;
                });
            case "locations":
                return data.filter((location) => {
                    return location.street && location._id;
                });
            case "cities":
                return data.filter((city) => {
                    return city.name && city._id;
                });
            case "relays":
                return data.filter((relay) => {
                    return relay.name && relay._id;
                });
            case "cases":
                // TODO : RAJOUTER LES NOMS POUR LES CAS DANS SYNC SERVICE, API ET INITJS
            default:
                break;
        }
    }

    const handleChanges = (value) => {
        console.log(value);
        setInput(value);
        fetchData();
    }
    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Rechercher..."
                className="search-input"
                value={input}
                onChange={(e) => handleChanges(e.target.value)}
            />
            <FaSearch id='search-icon'/>
        </div>
    );
}

export default SearchBar;
import SearchBar from '../components/searchBar';
import { useState } from 'react';
import '../css/search.css';
import { SearchResultList } from '../components/SearchResultList';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Search = () => {
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState("persons");

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setResults([]);
    };

    return (
        <div className="search-background">
            <h1 className='search-title'>Bienvenue sur CrimeLab</h1>

            <div className="search-container">
                <div className='search-bar-container'>
                    <SearchBar
                        setResults={setResults}
                        category={category}
                    />
                    <SearchResultList results={results} category={category} />
                </div>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="category-dropdown"
                >
                    <option value="persons">Personnes</option>
                    <option value="locations">Adresses</option>
                    <option value="cities">Villes</option>
                    <option value="relays">Relais</option>
                    <option value="cases">Affaires</option>
                </select>
            </div>
            <button className="button absolute row addCase">
                <FaPlus className='icon' />
                <Link to="/form/cases" className='link'>Ajouter une affaire</Link>
            </button>
        </div>

    );
};

export default Search;

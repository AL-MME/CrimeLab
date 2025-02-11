import SearchBar from '../components/searchBar';
import { useState } from 'react';
import '../css/search.css';
import { SearchResultList } from '../components/SearchResultList';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Search = () => {
    const [results, setResults] = useState([]);
    const [category, setCategory] = useState("Person");

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
                    <option value="Person">Personnes</option>
                    <option value="Location">Adresses</option>
                    <option value="City">Villes</option>
                    <option value="Relay">Relais</option>
                    <option value="Case">Affaires</option>
                </select>
            </div>
            <div className='button absolute row addCase'>
                <FaPlus className='icon' />
                <Link to="/form/cases" className='link'>Ajouter une affaire</Link>
            </div>
        </div>

    );
};

export default Search;

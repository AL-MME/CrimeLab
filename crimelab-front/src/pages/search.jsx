import SearchBar from '../components/searchBar';
import { useState } from 'react';
import '../css/search.css';
import { SearchResultList } from '../components/SearchResultList';

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
                    <SearchResultList results={results} />
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
        </div>

    );
};

export default Search;

import SearchBar from '../components/searchBar';
import { useState } from 'react';
import '../css/search.css';
import { SearchResultList } from '../components/SearchResultList';

const Search = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false); // Indique si les résultats sont en cours de chargement
    const [error, setError] = useState(null); // Gère les erreurs
    const [category, setCategory] = useState("persons"); // Catégorie active

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setResults([]); // Réinitialise les résultats lors du changement de catégorie
        setError(null);
    };

    return (
        <div className="search-background">
            <h1 className='search-title'>Bienvenue sur CrimeLab</h1>

            {/* Sélecteur de catégorie */}
            <div className="category-selector">
                <label htmlFor="category">Choisir une catégorie :</label>
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
                    <option value="cases">Cas</option>
                </select>
            </div>

            <div className='search-bar-container'>
                <SearchBar
                    setResults={setResults}
                    category={category}
                    setLoading={setLoading}
                    setError={setError}
                />
                {loading && <p className="loading-message">Chargement des résultats...</p>}
                {error && <p className="error-message">{error}</p>}
                <SearchResultList results={results} />
            </div>
        </div>
    );
};

export default Search;

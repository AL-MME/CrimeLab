import { FaSearch } from 'react-icons/fa';
const SearchBar = (type) => {

    return (
        <div className="search-bar">
            <FaSearch id='search-icon'/>
            <input
                type="text"
                placeholder="Rechercher un criminel..."
            />
        </div>
    );
}

export default SearchBar;
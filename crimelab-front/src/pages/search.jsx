import SearchBar from '../components/searchBar';
import '../css/search.css';


const Search = () => {
    return (
        <div className="search-background">
            <h1 className='search-title'>Bienvenue sur CrimeLab</h1>
            <div className='search-bar-container'>                
                <SearchBar />
                <div className="search-results">SearchResults</div>
            </div>
        </div>
    );
}

export default Search;
import SearchBar from '../components/searchBar';
import '../css/search.css';


const Search = () => {
    return (
        <div className="search-background">
            <h1 className='search-title'>Bienvenue sur CrimeLab</h1>
            <SearchBar />
        </div>
    );
}

export default Search;
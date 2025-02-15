import SearchBar from "../components/SearchBar";
import { useState } from "react";
import "../css/search.css";
import { SearchResultList } from "../components/SearchResultList";
import { Link } from "react-router-dom";
import { FaPhone, FaPlus } from "react-icons/fa";

const Search = () => {
  const [results, setResults] = useState([]);
  const [category, setCategory] = useState("Person");
  const [popup, setPopup] = useState(false);

  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setResults([]);
  };

  const handleUpload = () => {
    const fileInput = document.querySelector('.popup-input-csv');
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch(`${process.env.REACT_APP_API_URL}/fadette/csv`, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            setPopup(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    }

  return (
    <div className="search-background">
      <h1 className="search-title">Bienvenue sur CrimeLab</h1>

      <div className="search-container">
        <div className="search-bar-container">
          <SearchBar setResults={setResults} category={category} />
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
      <div className="floatingButton absolute row addCase">
        <FaPlus className="icon" />
        <Link to="/form" className="link">
          Ajouter une affaire
        </Link>
      </div>
      <div
        className="floatingButton absolute row addFadette"
        onClick={handlePopup}
      >
        <FaPhone className="icon" />
        <p className="link">Ajouter des fadettes</p>
      </div>
      {popup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Upload CSV File</h2>
            <input type="file" accept=".csv" className="popup-input-csv"/>
            <div className="popup-buttons">
              <button type="button" onClick={handlePopup} className="close-button">
                Close
              </button>
              <button className="upload-button" onClick={handleUpload()}>Sauvegarder</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;

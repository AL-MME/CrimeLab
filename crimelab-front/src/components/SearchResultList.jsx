import React from "react";
import "../css/search.css";

export const SearchResultList = ({ results }) => {
    return (
        <div className="search-results">
            {results.length === 0 ? (
                <p className="no-results">Aucun résultat trouvé.</p>
            ) : (
                results.map((result, index) => (
                    <div key={index} className="search-result">
                        <p>{result}</p>
                    </div>
                ))
            )}
        </div>
    );
};

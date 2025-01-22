import React from "react";
import "../css/search.css";

export const SearchResultList = ({ results }) => {
    return (
        <div className="search-results">
            {
                results.length > 0 ? results.map((result, index) => (
                    <p key={index} className="p-results">{result}</p>)) : null
            }
        </div>
    );
};

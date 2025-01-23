import React from "react";
import "../css/search.css";
import { Link } from "react-router-dom";

export const SearchResultList = ({ results }) => {

    return (
        <div className="search-results">
            {
                results.length > 0 ? results.map((result, index) => (
                    <Link key={index} to={`/details/${result.id}`} className="p-results">{result.name}</Link>)) : null
            }
        </div>
    );
};

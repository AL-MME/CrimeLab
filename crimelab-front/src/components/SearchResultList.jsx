import React from "react";
import "../css/search.css";
import { Link } from "react-router-dom";

export const SearchResultList = ({ results, category }) => {

    return (
        <div className="search-results">
            {
                results.length > 0 ? results.map((result, index) => (
                    <Link key={index} to={`/details?id=${result.id}&cat=${category}`} className="p-results">{result.name}</Link>)) : null
            }
        </div>
    );
};

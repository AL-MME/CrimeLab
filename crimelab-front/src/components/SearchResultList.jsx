import React from "react";
import "../css/search.css";
import { useNavigate } from "react-router-dom";

export const SearchResultList = ({ results, category }) => {
    const navigate = useNavigate();

    const navigateToDetails = (id, category) => {
        localStorage.setItem("details", JSON.stringify({ id, category }));
        console.log(localStorage.getItem("details"));
        navigate(`/details`);
    };

    return (
        <div className="search-results">
            {
                results.length > 0 ? results.map((result, index) => (
                    <p key={index} onClick={() => navigateToDetails(result.id, category)} className="p-results">{result.name}</p>)) : null
            }
        </div>
    );
};

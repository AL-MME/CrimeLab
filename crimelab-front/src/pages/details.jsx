import React from "react";
import "../css/details.css";


export const Details = () => {  
const queryParams = new URLSearchParams(window.location.search);
const id = queryParams.get('id');

return (
    <div>
        <h1>Details Page</h1>
        <p>ID: {id}</p>
    </div>
);
};
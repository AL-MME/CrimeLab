import React from "react";
import "../css/details.css";
import { useLocation } from "react-router-dom";
import NeoGraph from "../components/NeovisVisualizer";


export const Details = () => {
const { search } = useLocation();
const queryParams = new URLSearchParams(search);
const id = queryParams.get('id');
const cat = queryParams.get('cat');

return (
    <div>
        <h1>Details Page</h1>
        <p>ID: {id}</p>
        <p>CAT: {cat}</p>
        <NeoGraph />
    </div>
);
};
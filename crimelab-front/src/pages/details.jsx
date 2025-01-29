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
        <div className="details-background">
            <div className="details-background-image">
                <div className="details-navbar">
                    <div className="details-navbar-title">
                        <h1 className="crimeLabH1">CrimeLab</h1>
                    </div>
                </div>
                <div className="details-content">
                    <NeoGraph />
                </div>
            </div>
        </div>
    );
};
import React, { useState, useEffect } from "react";
import "../css/details.css";
import { useLocation } from "react-router-dom";
import NeoGraph from "../components/NeovisVisualizer";
import { NodeDetails } from "../components/NodeDetails";

export const Details = () => {
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    const cat = queryParams.get('cat');
    const [showDetails, setShowDetails] = useState(false);
    const [nodeDetails, setNodeDetails] = useState({});
    const [scope, setScope] = useState(1);
    const [filters, setFilters] = useState({
        persons: true,
        locations: true,
        cities: true,
        relays: true,
        cases: true,
        testimonies: true,
        fadettes: true,
    });

    const handleFilterChange = (filterName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };


    const handleNodeClick = (node) => {
        setShowDetails(true);
        setNodeDetails(node.raw.properties);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    return (
        <div className="details-background">
            <div className="details-background-image">
                <div className="details-navbar">
                    <div className="details-navbar-title">
                        <h1 className="crimeLabH1">CrimeLab</h1>
                    </div>
                    <h2>Scope</h2>
                    <div className="details-navbar-counter">
                        <button className="decrement" onClick={() => setScope(scope - 1)}>-</button>
                        <input type="text" className="counter-input" value={scope} readOnly />
                        <button className="increment" onClick={() => setScope(scope + 1)}>+</button>
                    </div>
                    <div className="filters">
                        <h2>Filtres</h2>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.cities}
                                onChange={() => handleFilterChange("cities")}
                            />
                            Villes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.persons}
                                onChange={() => handleFilterChange("persons")}
                            />
                            Personnes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.cases}
                                onChange={() => handleFilterChange("cases")}
                            />
                            Affaires
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.locations}
                                onChange={() => handleFilterChange("locations")}
                            />
                            Lieux
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.relays}
                                onChange={() => handleFilterChange("relays")}
                            />
                            Relais
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.testimonies}
                                onChange={() => handleFilterChange("testimonies")}
                            />
                            Témoignages
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.fadettes}
                                onChange={() => handleFilterChange("fadettes")}
                            />
                            Fadettes
                        </label>
                    </div>
                </div>
                <div className="details-content">
                    <NeoGraph onNodeClick={handleNodeClick} category={cat} id={id} scope={scope} filters={filters} />
                </div>
                {showDetails && <NodeDetails node={nodeDetails} closeDetails={closeDetails} />}
            </div>
        </div>
    );
};

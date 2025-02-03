import React, { useState } from "react";
import "../css/details.css";
import NeoGraph from "../components/NeovisVisualizer";
import { NodeDetails } from "../components/NodeDetails";

export const Details = () => {
    const storedData = localStorage.getItem("details");
    const [id, setId] = useState(storedData ? JSON.parse(storedData).id : "");
    const [category, setCat] = useState(storedData ? JSON.parse(storedData).category : "");
    const [showDetails, setShowDetails] = useState(false);
    const [nodeDetails, setNodeDetails] = useState({});
    const [scope, setScope] = useState(1);
    const [filters, setFilters] = useState({
        Person: true,
        Location: true,
        City: true,
        Relay: true,
        Case: true,
        Testimony: true,
        Fadette: true,
    });

    const handleFilterChange = (filterName) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };


    const handleNodeClick = (node) => {
        setNodeDetails(node.raw.properties);
        setShowDetails(true);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    const editIdAndCat = (id, category) => {
        localStorage.setItem("details", JSON.stringify({ id, category }));
        console.log("id", id, "category", category);
        setId(id);
        setCat(category);
    }

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
                                checked={filters.City}
                                onChange={() => handleFilterChange("City")}
                            />
                            Villes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Person}
                                onChange={() => handleFilterChange("Person")}
                            />
                            Personnes
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Case}
                                onChange={() => handleFilterChange("Case")}
                            />
                            Affaires
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Location}
                                onChange={() => handleFilterChange("Location")}
                            />
                            Lieux
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Relay}
                                onChange={() => handleFilterChange("Relay")}
                            />
                            Relais
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Testimony}
                                onChange={() => handleFilterChange("Testimony")}
                            />
                            Témoignages
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={filters.Fadette}
                                onChange={() => handleFilterChange("Fadette")}
                            />
                            Fadette
                        </label>
                    </div>
                </div>
                <div className="details-content">
                    <NeoGraph onNodeClick={handleNodeClick} category={category} id={id} scope={scope} filters={filters} editIdAndCat={editIdAndCat} />
                </div>
                {showDetails && <NodeDetails node={nodeDetails} closeDetails={closeDetails} />}
            </div>
        </div>
    );
};

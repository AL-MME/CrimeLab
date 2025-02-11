import React, { useEffect, useState } from "react";
import "../css/modal.css";
import {CategoryAdapter} from "../utils/categoryAdapter";

const NodeEditionModal = ({ isOpen, onClose, onSave, node }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    if (!isOpen || !formData) return null;

    const properties = Object.keys(formData).filter(key => key !== '_id');

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Édition de Node</h2>
                <form onSubmit={handleSubmit}>
                    {properties.map((property) => (
                        <div className="form-group" key={property}>
                            <label htmlFor={property}>{property.charAt(0).toUpperCase() + property.slice(1)}</label>
                            {typeof formData[property] === 'string' && formData[property].length > 50 ? (
                                <textarea
                                    id={property}
                                    name={property}
                                    value={formData[property] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            ) : (
                                <input
                                    type="text"
                                    id={property}
                                    name={property}
                                    value={formData[property] || ''}
                                    onChange={handleChange}
                                    required
                                />
                            )}
                        </div>
                    ))}
                    <button type="submit">Sauvegarder</button>
                    <button type="button" onClick={onClose}>Annuler</button>
                </form>
            </div>
        </div>
    );
};

export default NodeEditionModal;
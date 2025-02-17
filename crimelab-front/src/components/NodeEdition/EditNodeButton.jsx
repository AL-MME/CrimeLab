import React from 'react';
import { Link } from "react-router-dom";
import '../../css/details.css';

const EditNodeButton = ({ nodeCategory, nodeId }) => {

    return (
        <Link to={`/edit/${nodeCategory}/${nodeId}`} className="edit-node-button">
            Edit
        </Link>
    );

}

export default EditNodeButton;
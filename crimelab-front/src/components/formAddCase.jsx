import '../css/form.css';
import {useState} from "react";

const FormAddCase = () => {
    const [formData, setFormData] = useState({
        crimeName: '',
        date: '',
        lieu: '',
        temoins: '',
        suspect: '',
        victime: '',
        description: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <div className="page-container">
            <div className="container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <div className="label">
                        <label>Nom du crime</label>
                        <input
                            type="text"
                            id="crimeName"
                            className="crime-name"
                            placeholder="Nom du crime"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="label">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="description"
                            placeholder="Décrivez le crime ici..."
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="testt">
                        <div className="label">
                            <label>Date</label>
                            <input
                                type="date"
                                id="date"
                                className="date"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="label">
                            <label htmlFor="lieu">Lieu</label>
                            <div className="test">
                                <select
                                    id="lieu"
                                    className="witness"
                                    onChange={handleChange}
                                >
                                    <option value="lieu1">Lieu 1</option>
                                    <option value="lieu2">Lieu 2</option>
                                    <option value="lieu3">Lieu 3</option>
                                    <option value="lieu4">Lieu 4</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="testt">
                        <div className="label">
                            <label htmlFor="temoins">Témoins</label>
                            <div className="test">
                                <select
                                    id="temoins"
                                    className="witness"
                                    onChange={handleChange}
                                >
                                    <option value="temoins1">Témoin 1</option>
                                    <option value="temoins2">Témoin 2</option>
                                    <option value="temoins3">Témoin 3</option>
                                    <option value="temoins4">Témoin 4</option>
                                </select>
                            </div>
                        </div>

                        <div className="testt">
                            <div className="label">
                                <label htmlFor="suspect">Suspect</label>
                                <div className="test">
                                    <select
                                        id="suspect"
                                        className="witness"
                                        onChange={handleChange}
                                    >
                                        <option value="suspect1">Suspect 1</option>
                                        <option value="suspect2">Suspect 2</option>
                                        <option value="suspect3">Suspect 3</option>
                                        <option value="suspect4">Suspect 4</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="testt">
                        <div className="label">
                            <label htmlFor="victime">Victime</label>
                            <div className="test">
                                <select
                                    id="victime"
                                    className="witness"
                                    onChange={handleChange}
                                >
                                    <option value="victime1">Victime 1</option>
                                    <option value="victime2">Victime 2</option>
                                    <option value="victime3">Victime 3</option>
                                    <option value="victime4">Victime 4</option>
                                </select>
                            </div>
                        </div>

                        <div className="label">
                            <label htmlFor="temoignage">Témoignage</label>
                            <div className="test">
                                <select
                                    id="victime"
                                    className="witness"
                                    onChange={handleChange}
                                >
                                    <option value="temoignage1">Témoignage 1</option>
                                    <option value="temoignage2">Témoignage 2</option>
                                    <option value="temoignage3">Témoignage 3</option>
                                    <option value="temoignage4">Témoignage 4</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="button-container">
                        <button type="submit" className="button">
                            Ajouter
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormAddCase;
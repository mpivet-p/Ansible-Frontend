import React, { useState } from "react";
import './Form.css';
import requestAndWait from "./utils/requestAndWait";

function BackgroundForm({handler}) {
    const [background, setBackground] = useState("metropolis.png");

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait(`${process.env.REACT_APP_ADDRESS}/api/background`, { task: "background-change", background: background});
        handler();
    }

    const handleChange = (event) => {
        setBackground(event.target.value);
    }

    function importAll(r) {
        return r.keys().map(r);
    }

    const myRegex = /\/static\/media\/(.*)\.[A-Za-z0-9]*\.(jpg|jpeg|png)/;

    const imagesList = importAll(require.context('../../playbooks/backgrounds', false, /\.(png|jpe?g|svg)$/));

    return (
        <div className="modal-form">
            <form onSubmit={handleSubmit}>
                <div  className="image-mosaic">
                    {imagesList.map((image, index) => {
                        const match = image.match(myRegex);
                        const value = `${match[1]}.${match[2]}`;
                        return (
                            <div className="radio-option" key={index}>
                                <label>
                                <input
                                    type="radio"
                                    value={value}
                                    id={value}
                                    checked={background === value}
                                    onChange={handleChange}
                                />
                                    <img src={image} width="140" heigth="78.75" alt={`${match[1]}.${match[2]}`}/>
                                </label>
                            </div>);
                        })}
                    </div>
                <br />
                <div className="form-buttons">
                    <button type="button" className="btn" onClick={handler}>Cancel</button>
                    <input type="submit" value="Submit" className="btn" />
                </div>
            </form>
        </div>
    );
}

export default BackgroundForm;

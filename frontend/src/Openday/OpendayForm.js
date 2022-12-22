import React, { useState } from "react";
import '../styles/Form.css';
import requestAndWait from "../utils/requestAndWait";

function OpendayForm({handler}) {
    const [pdf, setPdf] = useState("openc.pdf");

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait(`${process.env.REACT_APP_ADDRESS}/api/openday/start`, { taskName: "start-openday", extraVars: {version: pdf}});
        handler();
    }

    const handleChange = (event) => {
        setPdf(event.target.value);
    }

    return (
        <div className="modal-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="pdfchoice">pdf name: </label>
                <select type="text" name="pdf" id="pdfchoice" onChange={handleChange}>
                    <option value="openc.pdf">C</option>
                    <option value="openjs.pdf">JS</option>
                    <option value="openrush.pdf">rush</option>
                    <option value="openshell.pdf">shell</option>
                    <option value="openweb.pdf">web</option>
                </select>
                <br />
                <div className="form-buttons">
                    <button type="button" className="btn" onClick={handler}>Cancel</button>
                    <input type="submit" value="Submit" className="btn" />
                </div>
            </form>
        </div>
    );
}

export default OpendayForm;

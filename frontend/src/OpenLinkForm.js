import React, { useState } from "react";
import './Form.css';
import requestAndWait from "./utils/requestAndWait";

function OpendayForm({handler}) {
    const [link, setLink] = useState("");
    const [browser, setBrowser] = useState("Google Chrome.app");

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait("/api/openlink", { task: "openlink-start", browser: browser, link: link});
        handler();
    }

    const handleChange = (event) => {
        if (event.target.id === "browserchoice") {
            setBrowser(event.target.value)
        }
        else {
            setLink(event.target.value);
        }
    }

    return (
        <div className="modal-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="browserchoice">Browser: </label>
                <select type="text" name="browser" id="browserchoice" onChange={handleChange}>
                    <option value="Google Chrome.app">Google Chrome</option>
                    <option value="Safari.app">Safari</option>
                    <option value="Firefox.app">Firefox</option>
                </select><br />
                <label htmlFor="link">Link</label>
                <input type="text" name="link" onChange={handleChange}/><br />
                <button type="button" className="btn" onClick={handler}>Cancel</button>
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    );
}

export default OpendayForm;
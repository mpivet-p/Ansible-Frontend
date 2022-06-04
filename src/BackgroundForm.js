import React, { useState } from "react";
import './Form.css';
import requestAndWait from "./utils/requestAndWait";

function BackgroundForm({handler}) {
    const [background, setBackground] = useState("metropolis.png");

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait("/api/background", { task: "background-change", background: background});
        handler();
    }

    const handleChange = (event) => {
        setBackground(event.target.value);
    }

    return (
        <div className="background-form">
            <form onSubmit={handleSubmit}>
                <label htmlFor="background-choise">background: </label>
                <select type="text" name="background" id="background-choice" onChange={handleChange}>
                    <option value="openDayEvent.png">openDayEvent.png</option>
                    <option value="metropolis.png">metropolis.png</option>
                    <option value="pina.png">pina.png</option>
                    <option value="KC_0.png">KC_0.png</option>
                </select><br />
                <input type="submit" value="Submit" className="btn" />
            </form>
        </div>
    );
}

export default BackgroundForm;
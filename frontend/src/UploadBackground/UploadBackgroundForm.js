import React, { useState } from "react";
import axios from "axios";
import '../styles/Form.css';

function UploadBackgroundForm({handler}) {
    const [fileSelected, setFileSelected] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('background-upload', fileSelected);
        axios.post(`${process.env.REACT_APP_ADDRESS}/api/background/upload`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response);
        });
        handler();
    }

    const handleChange = (event) => {
        setFileSelected(event.target.files[0]);
    }

    return (
        <div className="modal-form">
            <form onSubmit={handleSubmit}>
                <input type="file" id="img-upload" name="background-upload" accept="image/png, image/jpeg" onChange={handleChange} />
                <br />
                <div className="form-buttons">
                    <button type="button" className="btn" onClick={handler}>Cancel</button>
                    <input type="submit" value="Submit" className="btn" />
                </div>
            </form>
        </div>
    );
}

export default UploadBackgroundForm;

import axios from "axios";
import React, { useEffect, useState } from "react";
import '../Form.css';
import requestAndWait from "../utils/requestAndWait";

function BackgroundForm({handler}) {
    const [images, setImages] = useState([]);
    const [background, setBackground] = useState("metropolis.png");

    const fetchProducts = async () => {
        await axios.get(`${process.env.REACT_APP_ADDRESS}/api/background/list`, {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then(response => {
            console.log(response.data.files);
            setImages(response.data.files);
        });
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        requestAndWait(`${process.env.REACT_APP_ADDRESS}/api/background`, { task: "background-change", background: background});
        handler();
    }

    const handleChange = (event) => {
        setBackground(event.target.value);
    }

    return (
        <div className="modal-form">
            <form onSubmit={handleSubmit}>
                <div  className="image-mosaic">
                    {images.map((image) => {
                        return (
                            <div className="radio-option" key={image}>
                                <label>
                                <input
                                    type="radio"
                                    value={image}
                                    id={image}
                                    checked={background === image}
                                    onChange={handleChange}
                                />
                                    <img src={`backgrounds/${image}`} width="140" heigth="78.75" alt={image}/>
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

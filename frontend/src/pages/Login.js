import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        if (inputs["password"] && inputs["email"]) {
            let btn = document.getElementById("auth-submit");
            btn.disabled = false;
        }
        else {
            let btn = document.getElementById("auth-submit");
            btn.disabled = true;
        }
    }, [inputs]);

    const check_token = (token) => {
        axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");
        axios.get(`${process.env.REACT_APP_ADDRESS}/check_token`)
        .then(response => {
            if (response.status === 200) {
                return true;
            }
            localStorage.removeItem("token");
            return false;
        })
        .catch(err => {
            localStorage.removeItem("token");
            return false;
        });
    }

    if (localStorage.getItem("token") && check_token(localStorage.getItem("token")) === false)
        return(<Navigate replace to={{ pathname: '/' }} />);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["x-access-token"] = token;
        }
        else
            delete axios.defaults.headers.common["x-access-token"];
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`${process.env.REACT_APP_ADDRESS}/login`, inputs)
        .then(response => {
            //get token from response
            const token  =  response.data.token;
            localStorage.setItem("token", token);

            //set token to axios common header
            setAuthToken(token);

            //redirect user to home page
            window.location.href = '/'
        })
        .catch(err => {
            if (err.response.status === 400) {
                let error_p = document.getElementById("auth-status");
                error_p.style.visibility = "visible";
                error_p.innerHTML = `<p>${err.response.data}</p>`;
            }
        });
    }

    return (
    <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <h1>Hello There!</h1>
            <input type="text" id="email-input" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" id="pwd-input" name="password" placeholder="Password" onChange={handleChange} />
            <div id="auth-status">
            </div>
            <input id="auth-submit" type="submit" name="submit" value="Login" disabled={true} />
        </form>
    </div>)
}

export default LoginPage;

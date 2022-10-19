import React, { useState } from "react";
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
    const [inputs, setInputs] = useState({});

    if (localStorage.getItem("token"))
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
        .catch(err => console.log(err));
    }
    return (
    <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email</label>
            <input type="text" id="email-input" name="email" onChange={handleChange} /><br />
            <label htmlFor="pwd">Password:</label>
            <input type="password" id="pwd-input" name="password" onChange={handleChange} /><br />
            <input type="submit" name="submit" value="Login" />
        </form>
    </div>)
}

export default LoginPage;

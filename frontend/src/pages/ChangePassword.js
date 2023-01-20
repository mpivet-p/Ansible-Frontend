import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/LoginPage.css';

function ChangePasswordPage() {
    const [inputs, setInputs] = useState({});

    useEffect(() => {
        if (inputs["password"] && inputs["confirm-password"] && (inputs["password"].length >= 8 || inputs["confirm-password"].length >= 8) && inputs["password"] === inputs["confirm-password"]) {
            let btn = document.getElementById("auth-submit");
            btn.disabled = false;
        }
        else {
            let btn = document.getElementById("auth-submit");
            btn.disabled = true;
        }
        if (inputs["password"] && inputs["confirm-password"] && inputs["password"] !== inputs["confirm-password"]) {
            document.getElementById("pwd-confirm-input").classList.add("input-error");
        }
        else {
            document.getElementById("pwd-confirm-input").classList.remove("input-error");
        }
    }, [inputs]);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const setAuthToken = (token) => {
        if (token)
            axios.defaults.headers.common["x-access-token"] = token;
        else
            delete axios.defaults.headers.common["x-access-token"];
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`${process.env.REACT_APP_ADDRESS}/changepwd`, inputs,
            {headers: {
                "x-access-token": localStorage.getItem("token")
            }})
        .then(response => {
            const token  =  response.data.token;
            localStorage.setItem("token", token);

            setAuthToken(token);
            window.location.href = '/'
        })
        .catch(err => {
            if (err.response.status >= 400 && err.response.status < 500) {
                console.log(err.response.data);
                let error_p = document.getElementById("auth-status");
                error_p.style.visibility = "visible";
                error_p.innerHTML = `<p>${err.response.data}</p>`;
            }
        });
    }

    const show_modif_user = () => {
        if (userMod && userMod !== "/changepassword") {
            return (<p>{userMod}</p>);
    }}

    const userMod = window.location.pathname.split("/changepassword/").pop();
    return (
    <div className="auth-form">
        <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <div>
                {show_modif_user()}
            </div>
            <input type="password" id="pwd-input" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" id="pwd-confirm-input" name="confirm-password" placeholder="Confirm password" onChange={handleChange} />
            <div id="auth-status">
            </div>
            <input id="auth-submit" type="submit" name="submit" value="Change Password" disabled={true} />
        </form>
    </div>)
}

export default ChangePasswordPage;

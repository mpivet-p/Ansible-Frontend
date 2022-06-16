import React from "react";

function Auth() {
    const urlParams = new URLSearchParams(window.location.search);
    const auth_code = urlParams.get("code");
    console.log("Auth loaded");
    const getCookie = (cookie, name) => {
        let cookieArr = cookie.split(";");

        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");
            if (cookiePair[0] === name) {
                return (cookiePair[1]);
            }
        }
        return (null);
    };

    if (auth_code === null && getCookie(document.cookie, "access_token") === null) {
        window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&response_type=code";
    }
    else if (getCookie(document.cookie, "access_token") === null) {
        window.history.replaceState({}, null, 'http://localhost:3000/auth');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"auth_code": auth_code})
        };
        fetch('/api/auth', requestOptions)
            .then((response) => {
                return (response.json());
            }).then((response_content) => {
                console.log("access_token received!");
                document.cookie = `access_token=${response_content.access_token};SameSite=Lax`;
                document.location.href = "http://localhost:3000";
            });
    }
    else {
        document.location.href = "http://localhost:3000";
    }
    return (null);
}

export default Auth;
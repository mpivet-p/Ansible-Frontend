import React from "react";

function Auth() {
    const urlParams = new URLSearchParams(window.location.search);
    const auth_code = urlParams.get("access_token");
    const failed = urlParams.get("failed") === "true";

    if (failed === true) {
        window.history.replaceState({}, null, `${process.env.REACT_APP_ADDRESS}/auth`);
        return (
            <div>
                Auth failed
                <a href={process.env.REACT_APP_AUTH_LINK}>Try again</a>
            </div>
        )
    }
    else if (auth_code === null) {
       window.location.href = process.env.REACT_APP_AUTH_LINK;
    }
    else if (auth_code != null) {
        document.cookie = `clustersToolsAuth=${auth_code};max-age=7000;SameSite=Lax`;
        document.location.href = `${process.env.REACT_APP_ADDRESS}/cluster/1`;
    }
    return (null);
}

export default Auth;

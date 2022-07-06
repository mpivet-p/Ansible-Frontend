import React from "react";

function Auth() {
    const urlParams = new URLSearchParams(window.location.search);
    const auth_code = urlParams.get("access_token");
    const failed = urlParams.get("failed") === "true";

    if (failed === true) {
        window.history.replaceState({}, null, 'http://localhost:3000/auth');
        return (
            <div>
                Auth failed
                <a href="https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code">Try again</a>
            </div>
        )
    }
    else if (auth_code === null) {
       window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code";
    }
    else if (auth_code != null) {
        document.cookie = `clustersToolsAuth=${auth_code};SameSite=Lax`;
        document.location.href = "http://localhost:3000";
    }
    return (null);
}

export default Auth;
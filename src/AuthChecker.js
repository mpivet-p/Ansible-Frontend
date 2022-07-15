import { useEffect } from "react";
import getCookie from './utils/getCookie.js'

function AuthChecker() {
    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            headers: {
                        'Content-Type': 'application/json',
                        'Auth42': getCookie("clustersToolsAuth")
                    }
        };
        let auth_code = getCookie("clustersToolsAuth");
        if (auth_code != null) {
            fetch('/api/auth', requestOptions)
            .then((response) => {
                if (response.status === 401 || response.status === 403) {
                    window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code";
                }
            });
        }
        else {
            window.location.href = "https://api.intra.42.fr/oauth/authorize?client_id=0f6655021889bb245a232b995a310a771b26fa2a2bfae2252d7e308e5c2ba7d0&redirect_uri=http%3A%2F%2Flocalhost%3A5000%2Fapi%2Fauth%2Fcallback&response_type=code";
        }
    }, []);
}

export default AuthChecker;
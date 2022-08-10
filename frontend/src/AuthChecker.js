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
            fetch(`${process.env.REACT_APP_ADDRESS}/api/auth`, requestOptions)
            .then((response) => {
                if (response.status === 401 || response.status === 403) {
                    window.location.href = process.env.REACT_APP_AUTH_LINK;
                }
            });
        }
        else {
            window.location.href = process.env.REACT_APP_AUTH_LINK;
        }
    }, []);
}

export default AuthChecker;

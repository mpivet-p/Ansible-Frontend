import fetch from 'node-fetch';

function check_token(token) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`},
    };
    fetch("https://api.intra.42.fr/v2/me", requestOptions)
        .then((response) => {
            return (response.json());
        }).then((response_content) => {
            return(response_content);
        });
    return (result);
}

export default check_token;
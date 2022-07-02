import fetch from "node-fetch";

function testhdl(req, res, next) {
    console.log(`auth_code: ${req.body.auth_code}`);
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${req.body.auth_code}`}
    };

    if (!(req.body.auth_code)) {
        console.log("Unauthorized");
        res.status(401).json({'error': 'Not authorized'});
    }
    else {
        fetch("https://api.intra.42.fr/v2/me", requestOptions)
            .then((response) => {
                return (response.json());
            }).then((response_content) => {
                console.log(`Token belongs to ${response_content["login"]}`);
                if (response_content["staff?"] != true) {
                    res.status(403).json({'error': 'Forbidden'});
                }
                else {
                    next();
                }
            });
    }
}

export default testhdl;
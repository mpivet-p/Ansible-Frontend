import fetch from "node-fetch";

async function check_auth(req, res, next) {
    const requestOptions = {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${req.headers.auth42}`}
    };
    if (!(req.headers.auth42)) {
        console.log("Unauthorized");
        res.status(401).json({'error': 'Not authorized'});
    }
    else {
        var response = await fetch("https://api.intra.42.fr/v2/me", requestOptions)
	if (response.status == 200) {
	    var response_content = await response.json();
            console.log(`Token from ${response_content["login"]}`);
            if (response_content["staff?"] != true) {
                res.status(403).json({'error': 'Forbidden'});
            }
            else {
		console.log("NEXT");
                next();
            }
	}
	else {
	    res.status(500).json({'error': 'Internal Server Error'});
	}
    }
}

export default check_auth;

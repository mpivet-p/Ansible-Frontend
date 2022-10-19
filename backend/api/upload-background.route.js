async function background_upload(req, res) {
    console.log(`${req.user.email} -> file upload`);
    res.status(200).send("Ok");
}

module.exports = background_upload;

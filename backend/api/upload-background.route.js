const child_process = require('child_process');

async function background_upload(req, res) {
    console.log(`${req.user.email} -> file upload (${req.file.filename})`);
    var command = "source scripts/venv/bin/activate && ./scripts/resize-img.py ../frontend/public/backgrounds/ " + req.file.path;

    console.log(command);
    await child_process.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        console.log(stderr);
        console.log(stdout);
        res.status(200).send("Ok");
    });
}

module.exports = background_upload;

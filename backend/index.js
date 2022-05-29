import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 8000;
// MongoClient.connect(
//     process.env.RESTVIEWS_DB_URI,
//     {
//         poolSize: 50,
//         wtimeOut: 2500,
//         useNewUrlParse: true
//     }
// )
// .catch(err => {
//     console.error(err.stack);
//     process.exit(1); 
// })
// .then(async client => {
//     app.listen(port, () => {
//         console.log(`Listening on port ${port}`);
//     })
// })
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    })
const mongoose = require("mongoose");
const createUserIfEmpty = require("../utils/createUserIfEmpty");

const { DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

exports.connect = () => {
  mongoose
    .connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connected to database");
     createUserIfEmpty();
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};

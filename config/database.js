const mongoose = require("mongoose");
const env = require("../config.json")
var bcrypt = require('bcryptjs');
/* const MONGO_URI = "mongodb+srv://yasine:yasine@cluster0.lqds1ty.mongodb.net/mmc" */


/* 

mongodb://yasine:yasine@cluster0.lqds1ty.mongodb.net/mmc 

mongodb://localhost:27017/mmcb
*/


const MONGO_URI = env.MONGO_URI
/* const MONGO_URI = process.env; */
exports.connect = () => {
    // Connecting to the database
    mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};
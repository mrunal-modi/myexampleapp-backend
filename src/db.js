const mongoose = require('mongoose');
let dbName = process.env.DB_NAME;
const dbAddress = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
if(!dbName || !dbAddress || !dbPort){
    throw new Error("Mongo error unable to configure database");
}

let options = {
    user:process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: dbName,
};

mongoose.connect(`mongodb+srv://${process.env.DB_HOST}`, options)
.then(() => console.log("connected!"))
.catch(err => {
    if (err.message.indexOf("ECONNREFUSED") !== -1) {
        console.error("Error: The server was not able to reach MongoDB. Maybe it's not running?");
        process.exit(1);
    } else {
        throw err;
    }
});
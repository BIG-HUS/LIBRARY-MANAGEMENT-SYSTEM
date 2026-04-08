const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.mongoDB);
        console.log("MongoDB is connected");
    } catch(error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectDb;
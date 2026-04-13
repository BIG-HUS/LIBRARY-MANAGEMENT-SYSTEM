const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        //connect node.js to mongoDB using mongoose
        const con = await mongoose.connect(process.env.mongoDB);

        console.log(`MongoDB connected: ${con.connection.host}`);
    }

    catch(err){
        console.error(err);//log error
        process.exit(1); //terminate process
    }
}

module.exports = connectDb;

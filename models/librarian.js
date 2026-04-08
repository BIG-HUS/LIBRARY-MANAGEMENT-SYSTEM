const mongoose = require("mongoose");

const libarianSchema = new mongoose.Schema({
    name: {type: String, required: true},

    staffId: {type: String, unique: true}
})
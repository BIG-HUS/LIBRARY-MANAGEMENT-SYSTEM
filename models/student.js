const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
        maxlength: [200, "Cannot exceed 200 characters"]
    },

    email: {
        type: String,
        unique: true,
        trim: true
    },

    studentId: {
        type: String,
        required: true,
        unique: true
    }
},

{
    timestamps: true
})

module.exports = mongoose.model("Student", studentSchema);
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },

    authors: [{type: mongoose.Schema.Types.ObjectId, ref: "authors", required: true}],

    isbn: {
        type: String,
        unique: true,
        required: [true, 'ISBN is required']
    },

    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },

    borrowedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "student",
        default: null
    },

    issuedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "librarian",
        default: null
    },

    returnDate: {
        type: Date,
        default: null
    },
}, 

{ //schema options
    timestamps: true

})

module.exports = mongoose.model("Book", bookSchema);
const mongoose = require(mongoose);

const librarianSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name is Required'],
        trim: true,
        maxlength: [200, "name should not exceed 200 characters"],
    },

    staffId : {
        type: String,
        required: unique,
        trim: true,
    }
},

{
    timestamps: true


})

module.exports = mongoose.model("Librarian", librarianSchema);
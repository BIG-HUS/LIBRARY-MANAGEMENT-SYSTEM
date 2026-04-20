const Book = require("../models/book");
const Author = require("../models/author");

const createBook = async (req,res) => {
    const{title,isbn,author} = req.body

    if(!title || !isbn) {
        return res.status(400).json({error: "Title and ISBN must be filled"}) 
    }

    const checkTitle = await Book.findOne({title: title});
    const checkIsbn = await Book.findOne({ISBN: isbn});
    //const checkAuthor = await Book.findOne({Author: author})

    if(checkTitle && checkIsbn) {
        return res.status(400).json({error: "Book already exists"});
    }

    const newBook = await Book.create({...req.body, AuthorId: author});

    res.status(200).json({
        message: "Book created successfully",
        data: newBook
    });
}


module.exports = {
    createBook,
}

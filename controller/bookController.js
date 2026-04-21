const Book = require("../models/book");
const Author = require("../models/author");

const createBook = async (req,res) => {

    try{
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

    catch(err){
        res.status(500).json({error: err.message})
    }
    
}


const getAllBooks = async (req,res) => {

    try{
        const {page=1,limit=10} = req.body;

        const skip = (page-1) * 10;

        const getBooks = await Book.find()
        .limit(parseInt(limit))
        .skip(parseInt(skip))
        .select('-__v')
        .exec()

        if(!getBooks){
            return res.status(400).json({error: "Books not available"})
        };

        res.status(200).json({
            message: "Books retrieved successfully",
            data: getBooks,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}


const getBookById = async (req,res) => {
    try{
        const bookId = req.params.id;

        const getBook = await Book.findById(bookId);

        if(!getBook){
            return res.status(400).json({error: "Book does not exist"});
        }

        res.status(200).json({
            message: "Book retrieved successfully",
            data: getBook
        })
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}

const updateBook = async (req,res) => {
    try{
        const updateId = req.params.id;
        const{title,isbn} = req.body;

        if(!title && !isbn){
            return res.status(400).json({error: "At least one field must be updated"});
        };

        const updated = await Book.findByIdAndUpdate(
            updateId,
            {
            ...(title && {title: title}),
            ...(isbn && {isbn: isbn})
            },

            {new: true}
        )

        if(!updated){
            return res.status(400).json({error: "Book not found"});
        }

        res.status(200).json({
            message: "Book updated successfully",
            data: updated
        })


    }

    catch(err){
        res.status(500).json({error: err.message});
    }
}


module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook
}

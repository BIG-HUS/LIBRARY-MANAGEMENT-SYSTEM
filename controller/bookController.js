const Book = require("../models/book");

exports.borrowBook = async (req,res) => {
    try{
        const{studentId,attendantId,returnDate} = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(400).json({message: "Book not found"})
        }

        if (book.status === "OUT"){
            return res.status(400).json({message: "Book is already borrowed"})
        }

        book.status = "OUT";
        book.borrowedBy = studentId;
        book.issuedBy = attendantId;
        book.returnDate = returnDate;

        await book.save();

        return res.status(200).json({message: "Book borrowed successfully"});
    }

    catch(err)
    {
        return res.status(500).json({message: "Error Occured"});
        //return res.status(500).json({message: err.message})
    }
}
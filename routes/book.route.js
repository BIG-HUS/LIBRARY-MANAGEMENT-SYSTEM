const express = require('express');
const router = express.Router()

const{createBook,getAllBooks,getBookById,updateBook} = require("../controller/bookController");

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook)

module.exports = router
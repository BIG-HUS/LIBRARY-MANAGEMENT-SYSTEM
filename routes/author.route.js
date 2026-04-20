const express = require('express');
const router = express.Router();

const{createAuthor,getAllAuthors, getAuthorsById, updateAuthor,deleteAuthor} = require("../controller/authorController");

router.post('/',createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorsById)
router.put('/:id', updateAuthor)
router.delete('/:id', deleteAuthor)


module.exports = router;
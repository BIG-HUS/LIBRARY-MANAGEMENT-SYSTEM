const express = require('express');
const router = express.Router();

const{createAuthor,getAllAuthors, getAuthorsById} = require("../controller/authorController");

router.post('/',createAuthor);
router.get('/', getAllAuthors);
router.get('/:id', getAuthorsById)


module.exports = router;
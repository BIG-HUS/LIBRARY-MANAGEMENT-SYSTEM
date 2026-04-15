const express = require("express");
const router = express.Router();

const{createStudent,getAllStudent, getStudentById} = require('../controller/studentController');

router.post('/', createStudent);
router.get('/', getAllStudent);
router.get('/:id', getStudentById)

module.exports = router;
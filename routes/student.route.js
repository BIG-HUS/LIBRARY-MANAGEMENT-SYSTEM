const express = require("express");
const router = express.Router();

const{createStudent,getAllStudent, getStudentById, updateStudent} = require('../controller/studentController');

router.post('/', createStudent);
router.get('/', getAllStudent);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);

module.exports = router;
const express = require("express");
const router = express.Router();

const{createStudent,getAllStudent, getStudentById, updateStudent,deleteStudent} = require('../controller/studentController');

router.post('/', createStudent);
router.get('/', getAllStudent);
router.get('/:id', getStudentById);
router.put('/:id', updateStudent);
router.delete('/:id', deleteStudent);

module.exports = router;
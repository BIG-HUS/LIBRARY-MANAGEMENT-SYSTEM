const express = require("express");
const router = express.Router();

const createStudent = require('../controller/studentController');

router.post('/', createStudent);

module.exports = router;
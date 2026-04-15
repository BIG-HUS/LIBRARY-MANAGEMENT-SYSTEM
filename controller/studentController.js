const Student = require("../models/student");
const {generateStudentId}  = require("../services/studentIdService");

//function declaration for handling a POST/Student request
const createStudent = async (req,res) => {
    try{
        const{name,email} = req.body;

        //validate input
        if (!name || !email){
            return res.status(400).json({error: "Name and email are required"});
        }

        //check if email already exists
        const existingStudentEmail = await Student.findOne({ email: email});

        if (existingStudentEmail){
            return res.status(409).json({error: 'Email already exists'});
        }

        //generate studentID
        const studentID = await generateStudentId();

        //create student in Database 
        const newStudent = await Student.create({...req.body, studentId: studentID});

        //Return success response
        res.status(201).json({
            message: 'Student created successfully',
            Data: newStudent
        });
    }
    
    catch(err) {
        res.status(500).json({
            error: 'Failed to create student',
            details: err.message
        });
    }
}

const getAllStudent = async (req,res) => {
    try{
       //Getting pagnation params from query string
       const{page = 1, limit = 10} = req.query;
       
       //calculating pages to skip
       const skip = (page - 1) * limit;

       //Fetching student from database
       const students = await Student.find()
       .skip(parseInt(skip))
       .limit(parseInt(limit))
       .select('-__v') //hides the __v field(MongoDB's internal version key)
       .exec() // executes the query

       const total = await Student.countDocuments() //counts how many student exists in the database for pagination

       res.status(200).json({
        message: "Student retrieved successfully",
        data: students,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
       });

    }

    catch(err){
        res.status(500).json({
            error: 'Failed to retrieve students',
            details: err.message
        });
    }
}


const getStudentById = async (req,res) => {
    try{
        const getStudentId = req.params.id; //gets ID from URL parameter

        const student = await Student.findById(getStudentId);

        if(!student){
            res.status(404).json({error:"Student does not exist"})
        }

        res.status(200).json({data: student});
    }
    
    catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    createStudent,
    getAllStudent,
    getStudentById
};
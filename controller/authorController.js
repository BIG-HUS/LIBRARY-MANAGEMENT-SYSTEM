const author = require("../models/author");

const createAuthor = async (req,res) => {
    try{
        const{name,bio} = req.body;

        //validate input
        if (!name){
            return res.status(400).json({message: "Name is required"});
        }

        const existingName = await author.findOne({name: name});

        if (existingName){
            return res.status(400).json({message: "Name already exists"})
        }

        //create name in database
        const newAuthor = await author.create({
            name: name.trim(),
            bio: bio ? bio.trim() : ""
        });

        res.status(201).json({
            message: "Author created successfully",
            data: newAuthor
        });
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}

const getAllAuthors = async (req,res) => {
    try{
        //Getting poignant params from query string
        const{page=1, limit=10} = req.query;

        //calculating queries to skip
        const skip = (page -1) *limit;

        //Fetching authors from database
        const getAuthors = await author.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit))
        .select('-__v') //Hides MongoDB's internal version key
        .exec()

        const total = await author.countDocuments();

        res.status(200).json({
            message: "Authors retrieved successfully",
            data: getAuthors,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: total
            }
        })
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}

const getAuthorsById = async (req,res) => {
    try{
        const authorId = req.params.id;

        //validate input
        const uniqueAuthorId = await author.findById(authorId);

        if (!uniqueAuthorId){
            return res.status(400).json({error: "Author does not exist"});
        }

        res.status(201).json({
            message: "Author retrieved successfully",
            data: uniqueAuthorId
        });
    }

    catch(err){
        res.status(500).json({error: err.message})
    }
}

const updateAuthor = async (req,res) => {
    try{
        const authorId = req.params.id;
        const{name,bio} = req.body;

        if(!name && !bio){
            return res.status(400).json({message:"At least One field is required"})
        }

        const updatedAuthor = await author.findByIdAndUpdate(
            authorId,
            {
                ...(name && {name: name}),
                ...(bio && {bio: bio})
            }, 

            {new: true}
        )
        if(!updatedAuthor){
            return res.status(400).json({error: "Author not found"})
        };

        res.status(200).json({
            message: "Update Success",
            data: updatedAuthor
        });

    }

    catch(err){
        res.status(500).json({error: err.message});
    }
}

const deleteAuthor = async (req,res) => {
    try{
        const authorId = req.params.id;

        if (!authorId){
            return res.status(400).json({error: "Author does not exist"});
        }

        const deletedAuthor = await author.findByIdAndDelete(authorId);

        res.status(200).json({
            message: "Author deleted successfully",
            data: deletedAuthor
        });
    }

    catch(err){
        res.status(500).json({error: err.message})
    };
}

module.exports = {
    createAuthor,
    getAllAuthors,
    getAuthorsById,
    updateAuthor,
    deleteAuthor
};
import taskModel from ".././models/task.model.js";

const createTaskController = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, address} = req.body;

        if(!firstName.trim && !lastName.trim() && !email.trim() && !phoneNumber.trim() && !address.trim()) {
            return res.status(400).json({
                message : "Enter All Details"
            })
        }

        if(!firstName.trim()) {
            return res.status(400).json({
                message : "Fisrt Nmae is required"
            })
        }

        if(!lastName.trim()) {
            return res.status(400).json({
                message : "Last Name is required"
            })
        }

        if(!email.trim()) {
            return res.status(400).json({
                message : "Email is required"
            })
        }

        if(phoneNumber.length === 0) {
            return res.status(400).json({
                message : "Phone Numner is required"
            })
        }

        if(!address.trim()) {
            return res.status(400).json({
                message : "Address is required"
            })
        }

        const {id} = req.user;

        const task = await taskModel.create({
            user : id,
            firstName : firstName,
            lastName : lastName,
            email : email,
            phoneNumber : phoneNumber,
            address : address
        });

        res.status(201).json({
            message : "Task created successfully",
            task
        })
    } catch (error) {   
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

const getAllTaskController = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        })
    }
}

const deleteTaskController = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        })
    }
}

export {
    createTaskController,
    getAllTaskController,
    deleteTaskController
}

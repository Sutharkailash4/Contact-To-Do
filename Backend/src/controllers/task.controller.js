import taskModel from ".././models/task.model.js";

const createTaskController = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, address} = req.body;

        if(!firstName.trim && !lastName.trim() && !email.trim() && !phoneNumber.trim() && !address.trim()) {
            return res.status(400).json({
                message : "Enter All Details"
            })
        }

        const user = req.user;

        console.log(user);

        res.send("Ok");
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

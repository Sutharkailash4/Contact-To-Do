import bcrypt from "bcrypt";
import userModel from "../models/auth.model.js";
import JWT from "jsonwebtoken";

const registerController = async (req, res) => {
    try {   

        if(!req.body) {
            return res.status(400).json({
                message : "Enter All Details"
            })
        }

        const {username, email, password}  = req.body;
        if(!username.trim() && !email.trim() && !password.trim()) {
            return res.status(400).json({
                message : "Enter All Credentials"
            });
        }

        if(!username.trim()) {
            return res.status(400).json({
                messsage : "Username is required"
            });
        }

        if(!email.trim()) {
            return res.status(400).json({
                message : "Email is required"
            });
        }
        
        if(!password.trim()) {
            return res.status(400).json({
                message : "password is required"
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or : [
                {username : username},
                {email : email}
            ]
        });

        if(isUserAlreadyExists) {
            return res.status(409).json({
                message : "User already exists with this credentials"
            });
        }
        
        const password_hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username : username,
            email : email,
            password : password_hash
        });

        const access_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "3h"
        }
    );

        const refresh_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    );

    res.cookie("access_token", access_token, {
        httpOnly : true,
        secure : true,
        sameSite : "strict"
    });

    res.cookie("refresh_token", refresh_token, {
        httpOnly : true,
        secure : true,
        sameSite : "strict",
    });

    res.status(201).json({
        message : "User register successfully",
        id : user._id,
        username : user.username,
        email : user.email
    });
            
    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

const loginController = async (req, res) => {
    try {
        if(!req.body) {
            return res.status(400).json({
                message : "Enter All Details",
            });
        }

        const {email, password} = req.body;

        if(!email.trim() && !password.trim()) {
            return res.status(400).json({
                message : "Enter All Credentials"
            })
        }
        
        if(!email.trim()) {
            res.status(400).json({
                message : "Username is required"        
            });
        }

        if(!password.trim()) {
            res.status(400).json({
                message : "Email is required"
            });
        }

        const user = await userModel.findOne({
            email : email
        });

        if(!user) {
            return res.status(404).json({
                message : "User does not exists"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect) {
            return res.status(409).json({
                message : "Password is incorrect"
            })
        }

        const access_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "3h"
        }
    );

        const refresh_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn : "7d"
        }
    );

    res.cookie("access_token", access_token, {
        httpOnly : true,
        secure : true,
        samSite : "strict"
    });

    res.cookie("refresh_token", refresh_token, {
        httpOnly : true,
        secure : true,
        sameSite : "strict"
    });

    res.status(201).json({
        message : "User login successfully",
        id : user._id,
        username : user.username,
        email : user.email
    });

    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
} 

const getMeController = async (req, res) => {
    try {
        const user = req.user;
        console.log(user);
        res.send("OK");
    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
} 
const logoutController = async (req, res) => {
    try {

    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

export {
    registerController,
    loginController,
    getMeController,
    logoutController
}
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
                message : "Username is required"
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

        const secret = process.env.JWT_SECRET || "supersecret";

        const access_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        secret,
        {
            expiresIn : "3h"
        }
    );

        const refresh_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        secret,
        {
            expiresIn : "7d"
        }
    );

    const secureCookie = process.env.NODE_ENV === "production";

    res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? "strict" : "lax",
    });

    res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? "strict" : "lax",
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
            return res.status(400).json({
                message : "Email is required"        
            });
        }

        if(!password.trim()) {
            return res.status(400).json({
                message : "Password is required"
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

        const secret = process.env.JWT_SECRET || "supersecret";

        const access_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        secret,
        {
            expiresIn : "3h"
        }
    );

        const refresh_token = JWT.sign({
            id : user._id,
            username : user.username,
            email : user.email
        },
        secret,
        {
            expiresIn : "7d"
        }
    );

    const secureCookie = process.env.NODE_ENV === "production";

    res.cookie("access_token", access_token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? "strict" : "lax"
    });

    res.cookie("refresh_token", refresh_token, {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? "strict" : "lax"
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
        const {id} = req.user;

        const user = await userModel.findById(id);

        if(!user) {
            return res.status(404).json({
                message : "Invalid credentials"
            });
        }

        res.status(200).json({
            message : "User fetched successfully",
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
const logoutController = async (req, res) => {
    try {
      const secureCookie = process.env.NODE_ENV === "production";

      res.clearCookie("access_token", {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? 'strict' : 'lax'
      });
      
      res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: secureCookie,
        sameSite: secureCookie ? 'strict' : 'lax'
      });
                  
        res.status(200).json({
            message : "User logout successfully"
        })
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
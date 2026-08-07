import JWT from "jsonwebtoken";
import userModel from "../models/auth.model.js";

const identifyUser = async (req, res, next) => {
    try {

        const token = req.cookies.access_token;

        let decoded ;

        try {

            decoded = JWT.verify(token, process.env.JWT_SECRET);

        } catch (error) {
            return res.status(400).json({
                message : "Something went wrong",
                error : error.message
            })
        }

        req.user = decoded;

        next();
        
    } catch (error) {
        res.status(400).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

export {
    identifyUser
}
import JWT from "jsonwebtoken";
import userModel from "../models/auth.model.js";

const identifyUser = async (req, res, next) => {
    try {

        const cookieToken = req.cookies?.access_token;
        const headerToken = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;

        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        let decoded;

        try {
            decoded = JWT.verify(token, process.env.JWT_SECRET || "supersecret");
        } catch (error) {
            return res.status(401).json({
                message : "Invalid or expired token",
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
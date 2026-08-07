import {body, validationresult} from "express-validator";

// Helper middleware to catch validation errors and respond early

const validateResult = (req, res, next) => {
    const errors = validationresult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            message : "Validation failed",
            errors : errors.array().map((err) => ({
                field : err.path,
                message : err.message
            })),
        });
    }
    next();
};

// Validation rules for register

const registerValidation = [
    body("username")
    .trim()
    .isEmpty()
    .withMessage("Username is required")
    .isLength({min : 6})
    .withMessage("Username must be at least 3 characters long"),

    body("email")
    .trim()
    .isEmpty()
    .withMessage("Email is reqired")
    .isEmail()
    .withMessage("Please provide a valid email address"),

    body("passowrd")
    .trim()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({min : 8})
    .withMessage("Password must be at least 8 characters long"),

    validateResult,
]

// Validation rules for login

const loginValidation = [
    body("email")
    .trim()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address"),

    body("password")
    .trim()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({min : 8})
    .withMessage("Password must be at least 8 characters long"),

    validateResult,
]

export {
    registerValidation,
    loginValidation
}
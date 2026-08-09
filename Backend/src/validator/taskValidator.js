import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg, 
      })),
    });
  }
  next();
};

const taskValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ min: 3 })
    .withMessage("First Name length must be at least 3 characters"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .isLength({ min: 3 })
    .withMessage("Last Name length must be at least 3 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("any") 
    .withMessage("Please provide a valid phone number"),

    body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required"),

  handleValidationErrors 
];


export {
    taskValidation
}
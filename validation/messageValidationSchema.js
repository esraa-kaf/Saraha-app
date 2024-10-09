const {body,param}=require("express-validator");

exports.addMessageValidate=[
    body("messageBody").notEmpty().withMessage("must exist").isLength({ min: 6, max: 200 }).withMessage("messageBody must be between 6 and 200 characters").isString().withMessage("name must string"),
    param("id").isLength({max:24},{min:24})


]
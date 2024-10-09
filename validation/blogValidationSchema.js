const {body}=require("express-validator");

exports.addBlogValidate=[
    body("title").notEmpty().withMessage("must exist").isLength(5).withMessage("must be <=5").isString().withMessage("name must string"),
    body("desc").notEmpty().withMessage("must exist").isLength(10).withMessage("must be <=10").isString().withMessage("desc must string")
]
const {body, check,param}=require("express-validator");
const User=require("../models/userModel")
/////////////////////////////////////////////////////////*******************************/////////////////////////////////////////////////
exports.signUpValidate=[
    body("name").notEmpty().withMessage(" you must enter your name").isString().withMessage("name must string"),
    body("Password").notEmpty().withMessage("you must enter your password").isStrongPassword({
        minLength: 6,
     
      }).withMessage("must be strong"),


    body("phone").notEmpty().withMessage("you must enter your phone").isNumeric().withMessage("must be numeric").isLength(11).withMessage("must be 11 number"),
    check("phone").custom((value) => {
        return User.findOne( { phone: value }).then((user) => {
          if (user) {
            return Promise.reject("you have used this before");
          }
        });
      }),
    check("email").custom((value) => {
      // console.log("valllll     ",value)
        return User.findOne( { email:value }).then((user) => {
          // console.log("eeeeeeeeeeee",user);

          if (user) {
            // console.log("user        ",user);
            return Promise.reject("you have used this before");
          }
          else{
            console.log("hhhhhhhhhhhhhh",user);
          }
        });
      })
      ,
      // body("profilePic").notEmpty().withMessage("you must enter your profilePic").isString().withMessage(" profilePic must string"),
      // body("role").isString().withMessage("must be string")
      // body("lastSeen").isString().withMessage("must be string")

    ]
    ,
    exports.updateUserValidate=[
        body("name").notEmpty().withMessage(" you must enter your name").isString().withMessage("name must string"),
        param("id").isLength({max:24},{min:24})
    ]
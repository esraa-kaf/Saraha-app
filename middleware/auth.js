// authorization
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const access={
  Admin:"admin",
  User:"user",
  HR:"hr"
}

const authMiddleware = (accessRoles)=>{
  console.log(accessRoles);
  
  return (req, res, next) => {
    const authHeader= req.header('Authorization'); 
    if (!authHeader) {
        //Unauthorized response 
        return   res.status(401).json({
                  status_code: 401,
                   data: null,
                  message: "You should register first",
                });;
      }
      try {
      const token = authHeader && authHeader.split(' ')[1] // split remove (pearer from token ) , [1]= علشان يبدا من بعد المسافه بتاعت pearer
       jwt.verify(token, process.env.secretKey,async function(err,decoded){
        const userData =await User.findById(decoded.id)
        console.log(userData);
          // Check if user has required role
       if(userData){
        if(accessRoles.includes(decoded.role)){
          req.user=userData
          next();
        }else{
          res.json({message:"you not authorized to get this data"})
          
        }
       }
     
      });
     
     
      
     
    } catch (err) {
      return res.status(401).json({ message: "you aren't authorized to access this resources"}); // expire , token not valid
    }
  }
}
module.exports={authMiddleware,access};
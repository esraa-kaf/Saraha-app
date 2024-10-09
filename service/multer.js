const multer=require('multer')
const path=require('path')
const fs=require('fs')
// recursive == اى فايل مش متكريت كريته 
// mkdirSync == كريت ليا فولدر علشان احط كل حاجه خاصه بيه فيه 
// customDest == uploads/user/profile


const validateFiletype ={
  image:['image/jpg','image/jpeg','image/png'],
  fileText:['application/pdf','text/plain','application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            ,'application/vnd.ms-excel','text/csv','application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/json'
  ],

}


function multerFun(customDest,acceptType){
        if(!fs.existsSync(path.join(__dirname,`../uploads/${customDest}`))){
            fs.mkdirSync(path.join(__dirname,`../uploads/${customDest}`),{recursive:true})
            }
        const storage= multer.diskStorage({
           destination:function(req,file,cb){
               req.destinationFile =`uploads/${customDest}`
               cb(null,path.join(__dirname,`../uploads/${customDest}`))
               console.log("file==========",file);
       
           },
           filename:function(req,file,cb){
               // console.log("kkkkkkkkkkkkkkk",file.originalname);
               
               const fullName= Date.now() +"-"+ file.originalname
               cb(null,fullName)
           }
           
         })
       
       ///////////////////////////////////
       // make validation on type image
       const fileFilter = function(req,file,cb){
        console.log(file.mimetype);
        
       if(acceptType.includes(file.mimetype)){
           cb(null,true)
       }else{
           req.fileUploadError = true
           cb(null,false)
       }
       }
       
       
       
       
         const upload=multer({dest:path.join(__dirname,`../uploads/${customDest}`),fileFilter,storage})
           return upload;
       
       }
       
       




module.exports={multerFun,validateFiletype}
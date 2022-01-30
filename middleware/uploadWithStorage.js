const multer = require('multer')
const path=require('path')
const fs = require("fs")
const storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, "images")
        },
        filename: function(req,file, cb){
            const myFileName= `${Date.now()}`+`${path.extname(file.originalname)}`
            cb(null, myFileName)
        }
    })
    //var upload = multer({ storage : storage }).array('userPhoto',2);
    const upload = multer({
        storage,
        limits:{fileSize:500000000},
        fileFilter: function(req,file,cb){
            if(path.extname(file.originalname)!='.jpeg') return(cb("invalid", false))
           cb(null, true)
        }
    })
    
module.exports = upload
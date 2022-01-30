const router=require('express').Router()
const req = require("express/lib/request")
const auth = require("../middleware/auth")
const multer= require("multer")
const path=require('path')
const fs = require("fs")
const upload=multer({dest:'/images'})
const Image=require("../models/image.model")
//
const uploadWithStorage = require("../middleware/uploadWithStorage")
//
const imageController=require("../app/controller/image.controller")
//show
router.get("/myimg/:id",auth,imageController.showimg)
router.get("/showall",auth,imageController.showall)
//add
router.post("/add",auth,imageController.addimg)
//delete
router.delete("/delete/:id",auth,imageController.deleteimg)
router.delete("/deletall",auth,imageController.deleteall)
//edit
router.post("/edit/:id",auth,imageController.editimg)
// //showlikes
router.post("/likes/:id",auth,imageController.showlike)

//addimg


//  router.post("/addimg/:id",auth,upload.single('image'),async function (req,res,next){
// //   //  res.send(req.file)
//      fs.rename(req.file.path,`${req.file.path}${path.extname(req.file.originalname)}`,()=>{})
// const newImage= new Image(req.body)
// newImage.img=`${req.file.path}${path.extname(req.file.originalname)}`

// //    
//     try{
// const savImage=await newImage.save()
// //        
//         res.send(savImage)
//     }
//     catch(e){
//         res.send(e.message)
//     }
// })
//
router.post("/addimg/:id",uploadWithStorage.single('imges'),async(req,res)=>{
try{ 
   // res.send(req.file)
    let image=await imageModel.findById(req.params.id);
    
   image.img=req.file.path
   console.log(image)
   if(!image){res.send(e)}
   await image.save()
    res.send(image.img)
   
  
}
catch(e){res.send(e)}


})

module.exports=router
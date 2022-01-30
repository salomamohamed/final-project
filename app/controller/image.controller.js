const async = require("hbs/lib/async")
const imageModel=require("../../models/image.model")

class Image{
    static addimg=async(req,res)=>{
        try{
         const img=new imageModel({
             userId:req.user._id,
             ...req.body
         })
         await img.save()
         res.send(img)
        }
        catch(e){
            res.send(e.message)
        }
    }
    //showmyimg
    static showimg=async(req,res)=>{
        try{
            let imge = await imageModel.findOne({_id: req.params.id})
            
            res.send(imge)
        }
        catch(e){
            res.send(e)
        }
    }
    //showall
    static showall=async(req,res)=>{
       await req.user.populate("myImages")
       res.send(req.user.myImages)
       
       
    }
//showlikes
static showlike=async(req,res)=>{
    try { 
     let like=0
        let img = await imageModel.findByIdAndUpdate(req.params.id,{$inc:{ like:1}
        })
        // req.params.id
     
       //let newlikes=like+1
       //await img.save()
       
       res.send(img) 
       
    }
    catch(e){
res.send(e.message)
    }
}
//delete 
static deleteimg=async(req,res)=>{
   try{ let imge = await imageModel.findByIdAndDelete(  req.user._id)
            res.send({message:"deleted"})
        
    }
        catch(e){
            res.send(e)
        }
}
//delete all img
static deleteall=async(req,res)=>{
    try{ let imge = await imageModel.deleteMany(  )
             res.send({message:"deleted all"})
         
     }
         catch(e){
             res.send(e)
         }
 }
 ///////edit 
 static editimg=async(req,res)=>{
     try{
       let img=await imageModel.findOneAndUpdate(req.user._id,{$set:({...req.body})})
       res.send({message:"edited"})
     }
     catch(e){
res.send(e)
     }
 }

















} 
module.exports = Image










































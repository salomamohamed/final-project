const { all } = require("express/lib/application")

const bcrypt = require("bcryptjs/dist/bcrypt")
const bcryptjs = require("bcryptjs")
const async = require("hbs/lib/async")
const userModel=require("../../models/user.model")
class User{
static addUser=async(req,res)=>{
  try{  let user= new userModel(req.body)
    await user.save()
    res.status(200).send({
      apiStatus:true,
      data:user,
    message:"data inserted"})}
    catch(e){
        res.status(500).send({
          apiStatus:false,
          data:e.message,
          message:"error adding"
          })
    }
}
//changepassword
static changepassword=async(req,res)=>{

      try{
          
          let newpassword=req.body.newpassword
          let oldpassword=req.body.oldpassword
          // res.send(req.user)
          const isValid=await bcryptjs.compare(oldpassword,req.user.password)
          if(!isValid)throw new Error("invaild pass")
          req.user.password=newpassword
          await req.user.save()
          res.send(req.user)
      }
      catch(e){
          res.send(e.message)
      }


    }
  //editprofile
  static Editprofile=async(req,res)=>{
    try{ 
       userModel.findByIdAndUpdate(req.params.id,{$set:({...req.body})})
       res.send({apiStatus:true, data:"done", message:"edited"})
    }
    catch(e){
      res.status(500).send({apiStatus:false, data:e.message, message:"editing error"})
    }
  }

    
static showAll=async(req,res)=>{
  try{  const alldata = await userModel.find()
   
    res.status(200).send({
      apiStatus:true,
      data:alldata,
      message:"data inserted"})}
    catch(e){
        res.status(500).send({
          apiStatus:false,
          data:e.message,
          message:"error adding"})
    }
}
static showone=async(req,res)=>{
  try{const user=await userModel.findById(req.params.id)
    let message="data inserted"
    let mStatus=200
    if(!user){mess="user is not found";mStatus=404}
  res.status(mStatus).send({
    apiStatus:true,
    data:user,
    message
  })}     

  catch(e){
    
    res.status(500).send({
      apiStatus:false,
      data:e.message,
      message:"error adding"})}
}
static deleteAll=async(req,res)=>{
  try{
  const data = await userModel.deleteMany()
  res.status(200).send({apiStatus:"true",data,message:"deleted"})}
  catch(e){res.status(500).send({apiStatus:"false",data,message:"delete all"})}
}
static deleteSingle=async(req,res)=>{
  try{const data=await userModel.findByIdAndDelete(req.params.id)
  let message="is deleted"
  let mStatus=200
  if(!data){
    message:"data isnot found ",
    mStatus=404
  }
  res.status(mStatus).send({apiStatus:"true",data,message:message})
}
catch(e){res.status(500).send({apiStatus:"false",data:e.message,message:"error delete"})

}
}

static login=async(req,res)=>{
  try {
    let user=await userModel.loginUser(req.body.email,req.body.password)
    let token = await user.generateToken()
    res.status(200).send({apiStatus:true,data:{user,token},message:"login"})
  }
  catch(e){
    res.status(500).send({apiStatus:false,data:e.message,message:"invaild data"})
  }
}
static me = async(req,res)=>{
  res.status(200).send({apiStatus:true, data:req.user, message:"data featched"})
}
//logout
static logout=async(req,res)=>{
  try{
 req.user.tokens=req.user.tokens.filter(t=>{return t.tokens!=req.token})
 req.user.save()
 res.status(200).send({res:"loggedout"})

  }
  catch(e){
   res.status(500).send({apiStatus:false, data:e.message})
  }
}
//logoutall
static logOutAll = async(req,res)=>{
  try{
      req.user.tokens = []
      await req.user.save()
      res.send("logged out")
  }
  catch(e){
      res.status(500).send({apiStatus:false, data:e.message})
  }
}









}
module.exports = User

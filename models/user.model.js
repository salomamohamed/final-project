const mongoose = require("mongoose")
const validator = require('validator')
const bcryptjs = require("bcryptjs")
const async = require("hbs/lib/async")
const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    trim:true,
},
gender:{
    type:String,
    trim:true,
    required:true,
enum:["male","female"]
},
userphone:{
    type:String,
    validate(value){
        if(!validator.isMobilePhone(value)) throw new Error("invalid is not numphone")
    }
},
password:{
type:String,
trim:true,
required:true,
validate(value){
        if(!validator.isStrongPassword(value)) throw new Error("invalid is not strongpassword")
    }
},
age:{
    type:Number,
    min:18,
    required:true,
    trim:true
},
adresses:[{
    addrtype:{type:"string",
    trim:"true"
},addrContent:{}
}],
email:{
    type:String,
    trim:true,
    unique:true,
    required:true,
    validate(value){
        if(!validator.isEmail(value))throw new Error(" invalid is not email")
    }
},
usrtype:{
    type:"String",
    trim:true,
    required:true,
    enum:["admin","user"]
},
img:{
    type:String
},
tokens:[ {token:{type:String, required:true}} ]
},
{timestamps:true}
)
//virtual relation 
userSchema.virtual("myImages",{
    ref:"Image",
    localField:"_id",
    foreignField:"userId"

})
//updatesave
userSchema.pre("save", async function(){
    const user = this
    if(user.isModified("password"))
        user.password = await bcryptjs.hash(user.password, 12)

})
//encryptpass

userSchema.statics.loginUser=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user)throw new Error("useremail is not valid")
    const isValid=await bcryptjs.compare(password,user.password)
    if(!isValid)throw new Error("password is not valid")
    return user
}


const jwt=require("jsonwebtoken")
userSchema.methods.generateToken=async function(){
    const user=this
    
    const token=jwt.sign({_id:user._id},"356")
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token

}






const User=mongoose.model("User",userSchema)
module.exports=User
const mongoose = require('mongoose')
const async = require("hbs/lib/async")
const {ObjectId}=mongoose.Schema.Types
const imageSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true
    },
    comment:{
        type:String,
        trim:true
    },
    publishdate:{
        type:Date,
        default : Date.now()
        },
    like:{
        type:Number,
       // type:ObjectId,
     //  default:0
    },
    img:{type:String},
    //relation
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }},
{timestamps:true})
const Image=mongoose.model("Image",imageSchema)
module.exports=Image
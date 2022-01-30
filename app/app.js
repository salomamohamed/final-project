const express=require("express")
const app=express()
const cors = require('cors')
require("dotenv").config()
require("../models/dbconnection/dbconnection")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
//user route
const userRouter= require("../routes/user.routes")
app.use("/user",userRouter)
//imageroute
const imageRouter=require("../routes/image.routes")
app.use("/image",imageRouter)
//
const path = require('path')
app.get('/files/:ext/:imgPath',async(req,res)=>{
    let filePath=`../${req.params.ext}/${req.params.imgPath}`
    res.sendFile(path.join(__dirname,filePath))
})
module.exports=app
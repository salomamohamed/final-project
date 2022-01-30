const adminAuth=function(req,res,next){
console.log("is Admin Auth")
console.log(req.user._id)
try{
if(user.type!=admin) throw new Error("notadmin ")
next()
}
catch(e){
    res.send("is not admin auth")
}
}














module.exports=adminAuth
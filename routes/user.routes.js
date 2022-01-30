const router=require('express').Router()
const userController=require("../app/controller/user.controller")
//auth
const auth=require("../middleware/auth")
const adminAuth=require("../middleware/authAdmin")
const uploadWithStorage = require("../middleware/uploadWithStorage")
//for users
router.post("/add",userController.addUser)
 router.get("/showall",auth,userController.showAll)
//router.get("/showall",userController.showAll)
router.get("/showone/:id",auth,userController.showone)
router.delete("/deleteall",auth,userController.deleteAll)
router.delete("/delete/:id",auth,adminAuth,userController.deleteSingle)
//editpro
router.post("/editprofile/:id",userController.Editprofile)
//changepass
router.post("/changepass/:id",auth,userController.changepassword)

//log
router.post("/login",userController.login)
router.post("/logout",auth,userController.logout)
router.post("/logoutAll", auth, userController.logOutAll)
//to return logindata
router.get("/me",auth,  userController.me)
//
router.post("/myProfile", auth, uploadWithStorage.single("image"), async(req,res)=>{
    try{
        req.user.img=req.file.path
        await req.user.save()
        res.send(req.user)

    }
    catch(e){
        res.send(e)
    }
})

module.exports=router
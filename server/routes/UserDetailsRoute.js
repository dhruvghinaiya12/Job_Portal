const {Router}=require("express")
const userDetailsController=require("../controller/UserDetailsController")
const UserDetailsRoutes=Router();

UserDetailsRoutes.post("/",userDetailsController.CreateNewUserDetails)
UserDetailsRoutes.get("/user/:userId",userDetailsController.getUserDetailsByUserId)
UserDetailsRoutes.patch("/:id",userDetailsController.updateDetails)


module.exports=UserDetailsRoutes;
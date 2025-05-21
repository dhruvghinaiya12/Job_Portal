const {Router}=require("express")
const usercontroller=require("../controller/UserController");
const Role = require("../middleware/CheckRole");
const UserRoutes=Router();

UserRoutes.post("/signup",usercontroller.SignUp)

UserRoutes.post("/login",usercontroller.Login)

UserRoutes.get("/info/:id",usercontroller.GetUserById)

UserRoutes.get("/Alluser",Role(["Admin"]),usercontroller.GetAllUsers)

UserRoutes.patch("/:id",usercontroller.Update)

UserRoutes.delete("/:id",usercontroller.Delete)

UserRoutes.get("/",Role(["Admin"]),usercontroller.UsersByQuery)

UserRoutes.get("/verify/:token/:otp", usercontroller.VerifyEmail);


module.exports=UserRoutes;
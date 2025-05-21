const {Router}=require("express")
const UserRoutes=require("./UserRoute");
const UserDetailsRoutes = require("./UserDetailsRoute");
const CompanyRoutes = require("./CompanyRoute");
const ApplicationRoutes = require("./ApplicationRoute");
const JobsRoutes = require("./JobsRoute");
const Routes=Router();

Routes.use("/user",UserRoutes)
Routes.use("/user-details",UserDetailsRoutes)
Routes.use("/companies",CompanyRoutes)
Routes.use("/applications",ApplicationRoutes)
Routes.use("/jobs",JobsRoutes)

module.exports=Routes; 
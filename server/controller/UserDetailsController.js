const userDetailService = require("../services/UserDetailsService");

exports.getUserDetailsByUserId = async (req, res) => {
    let { userId } = req.params;
    try {
      let userDetails = await userDetailService.GetUserDetails(userId);      
      res.send({ userDetails: userDetails });
    } catch (error) {
      res.send(error);
    }
  };
  
  exports.CreateNewUserDetails = async (req, res) => {
    try {
      let userid = req.user.id;
      req.body.user = userid;
      // console.log("CreateNewUserDetails payload:", req.body);
      let userDetails = await userDetailService.CreateUserDetails(req.body);
      res.send(userDetails);
    } catch (error) {
      console.error("Error in CreateNewUserDetails:", error); 
      res.status(500).send({ error: error.message });
    }
  };
  
  

exports.updateDetails = async (req, res) => {
  try {
    let { id } = req.params;
    let userDetails = await userDetailService.UpdateUserDetails(id, req.body);
    res.send({ userDetails: userDetails });
  } catch (error) {
    res.send(error);
  }
};


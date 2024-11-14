const jwt = require("jsonwebtoken");

// middleware
const jwtMiddleware = (req, res, next) => {
  console.log("Inside jwtMiddleware");
  // get token from req hearder "Authorization key"
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);
//   step to verify token
if(token){

  try{
    const jwtResponse =jwt.verify(token,process.env.JWT_PASSWORD)
  console.log(jwtResponse);
  req.userId =jwtResponse.userId
  next()
  
  }
  catch{
  res.status(401).json("Please login to proceed the step...")
  }

}else{
  res.status(406).json("Authentication failed...Token Missing...")

}

};
module.exports = jwtMiddleware;

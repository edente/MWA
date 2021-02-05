const config = require("config");
const jwt = require("jsonwebtoken");

function studentAuthorization(req, res, next) {
  // const token = req.header("x-auth-token");
  const token = req.headers["authorization"].split(" ")[1];
  console.log(token);

  if (!token)
    return res.status(401).json({
      msg: "No token, authorization denied",
    });

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    console.log(decoded);
    let student = decoded;

    console.log("reqqqqqqqqqqqqqq", req);
    console.log(student.role, "roooleeeeee");
    console.log(req.method, "");

    // if (
    //   req.method == "GET" &&
    //   req.url == `/api/students/${student.id}` &&
    //   student.role == "super"
    // ) {
    //   next();
    
    
    if(student.role=="student"){
      next()
    } else {
      res.status(400).json({
        msg: "You don't have an authorized role.",
      });
    }
  } catch (err) {
    res.status(400).json({
      msg: "Invalid token, authorization denied",
    });
  }
}

module.exports = studentAuthorization;

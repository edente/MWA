const config = require("config");
const jwt = require("jsonwebtoken");

function superAuthorization(req, res, next) {
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
    let farmer = decoded;

    console.log("reqqqqqqqqqqqqqq", req);
    console.log(farmer.role, "roooleeeeee");
    console.log(req.method, "");

    if(farmer.role=="super"){
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

module.exports = superAuthorization;

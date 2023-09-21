const jwt = require("jsonwebtoken"); //La bibilio token
const config = require("config"); //Pour la secret

module.exports = function (req, res, next) {
  //apres avoir fini on fait next() comme ca il peut aller a un autre middleware
  const token = req.header("x-auth-token"); //On grab voir s'il y'a un token

  if (!token) {
    //Si pas de token
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret")); //on verifie le token

    console.log("middleware token = " + token);
    req.user = decoded.user; //car c'est l'user qui lance la request
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

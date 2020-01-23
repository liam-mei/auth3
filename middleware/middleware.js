const jwt = require("jsonwebtoken");
const secrets = require("../secrets");

function restricted(req, res, next) {
  try {
    // const token = req.headers.authorization;
    const token = req.cookies.token;
    const decoded = jwt.verify(token, secrets.secret);
    if (decoded) {
      req.user = decoded.user;
      next();
    }
  } catch (err) {
    next({ status: 401, message: "Invalid Credentials", err });
  }
}

module.exports = { restricted };

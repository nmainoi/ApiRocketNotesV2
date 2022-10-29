const { verify } = require("jsonwebtoken");
const AppErro = require("../utils/AppError");
const authConfig = require("../config/auth");

function ensureAuth(req, res, next) {

  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    throw new AppErro("JWT token is missing", 401);
  }
  const [, token] = authHeader.split(" ");
  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);
    req.user = {
        id: Number(user_id),
    };
    return next();
  } catch {
    throw new AppErro("Invalid JWT token", 401);
  }
}

module.exports = ensureAuth;
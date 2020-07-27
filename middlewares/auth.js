const { findUserByToken } = require("../controllers/users");

async function userFromToken(req, res, next) {
  let auth = req.headers["authorization"];
  if (auth && auth.startsWith("Token ")) {
    let token = auth.split(" ")[1];
    const user = await findUserByToken(token);

    if (user) {
      req.user = user; //so that next middleware can get the user
      return next();
    }
  } else {
    res.status(401).send({
      errors: {
        body: ["Invalid Authorization code!"]
      }
    });
  }
}

module.exports = {
  userFromToken
};

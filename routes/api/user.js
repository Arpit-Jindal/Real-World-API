/*
Get Current User -> GET /api/user
Authentication required, returns a User that's the current user

Update User -> PUT /api/user
Authentication required, returns the User
*/

const { Router } = require("express");
const { userFromToken } = require("../../middlewares/auth");
const { updateUser } = require("../../controllers/users");

const route = Router();

// GET /api/user
route.get("/", userFromToken, async (req, res) => {
  res.send(req.user);
});

//PUT /api/user
route.put("/", userFromToken, async (req, res) => {
  const user = await updateUser(req.user, req.body.user);
  res.send(user);
});

module.exports = { route };

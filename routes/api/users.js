/*
Authentication -> POST /api/users/login
No authentication required, returns a User

Registration -> POST /api/users
No authentication required, returns a User
*/
const { Router } = require("express");
const { createUser, findUserByEmail } = require("../../controllers/users");

const route = Router();

// POST /api/users/login
route.post("/login", async (req, res) => {
  const u = req.body.user;
  const user = await findUserByEmail(u.email, u.password);
  res.send(user);
});

// POST /api/users
route.post("/", async (req, res) => {
  let u = req.body.user;
  const user = await createUser(
    u.username,
    u.email,
    u.password,
    u.bio,
    u.image
  );
  res.send(user);
});

module.exports = { route };

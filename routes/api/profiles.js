/* 
1. Get Profile -> GET /api/profiles/:username
Authentication optional, returns a Profile

2. Follow user -> POST /api/profiles/:username/follow
Authentication required, returns a Profile

3. Unfollow user -> DELETE /api/profiles/:username/follow
Authentication required, returns a Profile
*/
const { Router } = require("express");
const {
  getProfile,
  followUser,
  unfollowUser
} = require("../../controllers/profiles");
const { userFromToken } = require("../../middlewares/auth");
const route = Router();

//1. GET /api/profiles
route.get("/:username", async (req, res) => {
  const profile = await getProfile(req.params.username);
  res.send(profile);
});

//2. POST /api/profiles/:username/follow
route.post("/:username/follow", userFromToken, async (req, res) => {
  const profile = await followUser(req.user.username, req.params.username);
  res.send(profile);
});

//3. DELETE /api/profiles/:username/follow
route.delete("/:username/follow", userFromToken, async (req, res) => {
  const profile = await unfollowUser(req.user.username, req.params.username);
  res.send(profile);
});

module.exports = {
  route
};

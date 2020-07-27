const { Users } = require("../data/db");

async function getProfile(username) {
  const user = await Users.findOne({
    attributes: ["username", "bio", "image"],
    where: { username }
  });
  if (!user) {
    return {
      body: ["No user found!"]
    };
  }
  return {
    profile: {
      user
    }
  };
}

async function followUser(currentUser, newUser) {
  return "TODO: FOLLOW A USER";
}

async function unfollowUser(currentUser, newUser) {
  return "TODO: UNFOLLOW A USER";
}

module.exports = {
  getProfile,
  followUser,
  unfollowUser
};

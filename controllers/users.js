const { Users } = require("../data/db");
const { genRandomString } = require("../utils/random");

async function createUser(username, email, password, bio, image) {
  //TODO validate username, email, password, bio, image
  const user = await Users.create({
    email,
    username,
    password,
    token: genRandomString(32),
    bio,
    image
  });
  return user;
}

async function authUser(username, password) {
  const user = await Users.findOne({
    where: { username }
  });
  if (!user) {
    return {
      body: ["No user found!"]
    };
  }
  if (user.password !== password) {
    return {
      body: ["Incorrect Password"]
    };
  }
  return user;
}

async function findUserByToken(token) {
  const user = await Users.findOne({
    where: { token }
  });
  if (!user) {
    return {
      body: ["Invalid Token"]
    };
  } else return user;
}
async function findUserByEmail(email, password) {
  const user = await Users.findOne({
    where: { email }
  });
  if (!user) {
    return {
      body: ["No user found!"]
    };
  }
  if (user.password !== password) {
    return {
      body: ["Incorrect Password"]
    };
  }
  return user;
}
async function updateUser(oldUser, newUser) {
  //Doubt - primary key not able to update by this method

  // const user = await Users.findOne({
  //   where: { email: oldUser.email }
  // });
  // user.email = newUser.email || oldUser.email;
  // user.password = newUser.password || oldUser.password;
  // user.username = newUser.username || oldUser.username;
  // user.bio = newUser.bio || oldUser.bio;
  // user.image = newUser.image || oldUser.image;
  // await user.save();

  //Doubt - Return value of update???????

  const result = await Users.update(
    {
      email: newUser.email || oldUser.email,
      password: newUser.password || oldUser.password,
      username: newUser.username || oldUser.username,
      bio: newUser.bio || oldUser.bio,
      image: newUser.image || oldUser.image
    },
    {
      where: { username: oldUser.username },
      returning: true,
      plain: true
    }
  );

  const user = await Users.findOne({
    where: { email: newUser.email || oldUser.email }
  });

  return user;
}

module.exports = {
  createUser,
  authUser,
  findUserByToken,
  findUserByEmail,
  updateUser
};

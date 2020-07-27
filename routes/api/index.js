const { Router } = require("express");

//.route not required if we had 'module.exports = route; in articles.js
const articlesRoute = require("./articles").route;
const profilesRoute = require("./profiles").route;
const usersRoute = require("./users").route;
const userRoute = require("./user").route;

const route = Router();

route.use("/articles", articlesRoute);
route.use("/profiles", profilesRoute);
route.use("/users", usersRoute);
route.use("/user", userRoute);

module.exports = { route };

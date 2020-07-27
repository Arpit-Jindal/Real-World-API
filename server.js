const express = require("express");
const app = express();
const apiRoute = require("./routes/api").route;
const { db } = require("./data/db");

app.use(express.json());
app.use("/api", apiRoute);

db.sync().then(
  app.listen(7878, () => {
    console.log("server started on http://localhost:7878");
  })
);

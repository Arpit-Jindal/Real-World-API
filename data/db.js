const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "mysql",
  database: "blog_project",
  username: "blog_project_admin",
  password: "blog_project_admin_pass123"
});
const Users = db.define("user", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  token: {
    type: Sequelize.STRING(32),
    allowNull: false
  },
  bio: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING
  }
});

const Articles = db.define("article", {
  slug: {
    type: Sequelize.STRING(100),
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.TEXT
  }
  // TODO: Add favourites fields
});

Articles.belongsTo(Users, { as: "author" });
Users.hasMany(Articles, { as: "author" });

const Comments = db.define("comment", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
});
Comments.belongsTo(Articles);
Articles.hasMany(Comments);

Comments.belongsTo(Users);
Users.hasMany(Comments);

// TODO: FOLLOW,TAGS,FAVOURITE

// const Follow = db.define("follow", {
//   username: {
//     type: Sequelize.STRING,
//     allowNull: false
//   }
// });
// Follow.hasMany(Follow, { as: "follower" });

module.exports = {
  db,
  Users,
  Articles,
  Comments,
  Follow
};

const { Comments, Users } = require("../data/db");
const { Op } = require("sequelize");

async function createComment(username, slug, body) {
  if (!body) {
    return new Error("body missing");
  }
  const newComment = await Comments.create({
    body,
    articleSlug: slug,
    userUsername: username
  });

  const comment = await Comments.findOne({
    attributes: ["id", "createdAt", "updatedAt", "body"],
    where: { id: newComment.id },
    include: [
      {
        attributes: ["username", "bio", "image"],
        model: Users
      }
    ]
  });

  return { comment };
}

async function getComments(slug) {
  const comments = await Comments.findAll({
    attributes: ["id", "createdAt", "updatedAt", "body"],
    where: { articleSlug: slug },
    include: [
      {
        attributes: ["username", "bio", "image"],
        model: Users
      }
    ]
  });
  return { comments };
}

async function deleteComment(username, slug, id) {
  const n = await Comments.destroy({
    where: {
      [Op.and]: [{ id }, { articleSlug: slug }, { userUsername: username }]
    }
  });
  if (n) return "Deleted successfully!";
  return "Can not delete this comment!";
}

module.exports = {
  createComment,
  getComments,
  deleteComment
};

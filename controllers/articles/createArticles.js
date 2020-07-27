const { Articles, Users } = require("../../data/db");
const { slugify } = require("../../utils/string");
async function createArticle(title, description, body, authorUsername) {
  if (!title) {
    return new Error("title missing");
  }
  if (!body) {
    return new Error("body missing");
  }
  if (!authorUsername) {
    return new Error("author missing");
  }

  const newArticle = await Articles.create({
    slug: slugify(title),
    title,
    description,
    body,
    authorUsername
  });

  const article = await Articles.findOne({
    attributes: [
      "slug",
      "title",
      "description",
      "body",
      "createdAt",
      "updatedAt"
    ],
    where: {
      slug: newArticle.slug
    },
    include: [
      //happens via join
      {
        attributes: ["username", "bio", "image"],
        model: Users,
        as: "author"
      }
    ]
  });

  return {
    article
  };
}

module.exports = {
  createArticle
};

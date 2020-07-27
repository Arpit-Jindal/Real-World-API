const { Articles, Users } = require("../../data/db");
async function getAllArticles() {
  const articles = await Articles.findAll({
    attributes: [
      "slug",
      "title",
      "description",
      "body",
      "createdAt",
      "updatedAt"
    ],
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
    articles,
    articlesCount: articles.length
  };
}
async function getArticle(slug) {
  const article = await Articles.findOne({
    attributes: [
      "slug",
      "title",
      "description",
      "body",
      "createdAt",
      "updatedAt"
    ],
    where: { slug },
    include: [
      {
        attributes: ["username", "bio", "image"],
        model: Users,
        as: "author"
      }
    ]
  });
  if (!article) {
    return {
      body: ["No article found"]
    };
  }
  return {
    article
  };
}

module.exports = {
  getAllArticles,
  getArticle
};

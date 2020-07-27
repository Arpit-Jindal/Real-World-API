const { Articles } = require("../../data/db");
const { slugify } = require("../../utils/string");
const { Op } = require("sequelize");
const { getArticle } = require("./getArticles");

//Doubt - An optimized approach??
async function updateArticle(username, slug, newArticle) {
  //get the current article so that later oldArticle fields can be retained
  const oldArticle = await getArticle(slug);

  //find slug of new article if title is passed
  let newslug;
  if (newArticle.title) {
    newslug = slugify(newArticle.title);
  }

  //update the article
  const result = await Articles.update(
    {
      slug: newslug || slug,
      title: newArticle.title || oldArticle.title,
      description: newArticle.description || oldArticle.description,
      body: newArticle.body || oldArticle.body
    },
    {
      where: {
        [Op.and]: [{ slug }, { authorUsername: username }]
      },
      returning: true,
      plain: true
    }
  );

  //fetch the new article
  const article = await getArticle(newslug || slug);
  return article;
}

async function deleteArticle(username, slug) {
  const r = await Articles.destroy({
    where: {
      [Op.and]: [{ slug }, { authorUsername: username }]
    }
  });
  if (n) return "Deleted successfully!";
  return "Can not delete this article!";
}

module.exports = {
  updateArticle,
  deleteArticle
};

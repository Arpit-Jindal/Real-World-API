/*
1. Create Article -> POST /api/articles
Authentication required, will return an Article

2. List All Articles -> GET /api/articles

3. Get Article -> GET /api/articles/:slug
No authentication required, will return single article

4. Update Article -> PUT /api/articles/:slug
Authentication required, returns the updated Article

5.Delete Article -> DELETE /api/articles/:slug
Authentication required
*/
const { Router } = require("express");
const { createArticle } = require("../../controllers/articles/createArticles");
const {
  getAllArticles,
  getArticle
} = require("../../controllers/articles/getArticles");
const {
  updateArticle,
  deleteArticle
} = require("../../controllers/articles/modifyArticles");
const { userFromToken } = require("../../middlewares/auth");
const route = Router();

//1. POST /api/articles
route.post("/", userFromToken, async (req, res) => {
  let a = req.body.article;
  const article = await createArticle(
    a.title,
    a.description,
    a.body,
    req.user.username
  );
  res.send(article);
});

//2. GET /api/articles
route.get("/", async (req, res) => {
  const articles = await getAllArticles();
  res.send(articles);
});

//3. GET /api/articles/:slug
route.get("/:slug", async (req, res) => {
  const article = await getArticle(req.params.slug);
  res.send(article);
});

//4. PUT /api/articles/:slug
route.put("/:slug", userFromToken, async (req, res) => {
  const article = await updateArticle(
    req.user.username,
    req.params.slug,
    req.body.article
  );
  res.send(article);
});

//5. DELETE /api/articles/:slug
route.delete("/:slug", userFromToken, async (req, res) => {
  const result = await deleteArticle(req.user.username, req.params.slug);
  res.send(result);
});

/*
1. Add Comments to an Article -> POST /api/articles/:slug/comments
Authentication required, returns the created Comment

2. Get Comments from an Article -> GET /api/articles/:slug/comments
Authentication optional, returns multiple comments

3. Delete Comment -> DELETE /api/articles/:slug/comments/:id
Authentication required
*/

const {
  createComment,
  getComments,
  deleteComment
} = require("../../controllers/comments");

//1. POST /api/articles/:slug/comments
route.post("/:slug/comments", userFromToken, async (req, res) => {
  const comment = await createComment(
    req.user.username,
    req.params.slug,
    req.body.comment.body
  );
  res.send(comment);
});

//2. GET /api/articles/:slug/comments
route.get("/:slug/comments", async (req, res) => {
  const comments = await getComments(req.params.slug);
  res.send(comments);
});

//3. DELETE /api/articles/:slug/comments/:id
route.delete("/:slug/comments/:id", userFromToken, async (req, res) => {
  const msg = await deleteComment(
    req.user.username,
    req.params.slug,
    req.params.id
  );
  res.send(msg);
});

module.exports = {
  route
};

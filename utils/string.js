function slugify(title) {
  let slug = title
    .toLowerCase()
    .split(" ")
    .join("-");
  return slug;
}

module.exports = {
  slugify
};

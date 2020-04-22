module.exports = function (eleventyConfig) {
  var MarkdownIt = require("markdown-it"),
    md = new MarkdownIt();

  eleventyConfig.addPassthroughCopy({ "static/admin": "admin" });
  eleventyConfig.addPassthroughCopy("media");

  eleventyConfig.addFilter("md", function (value) {
    if (!value) {
      return "";
    }

    return md.render(value);
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
    },
  };
};

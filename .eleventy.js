module.exports = function (eleventyConfig) {
  const markdownOptions = {
    html: true,
  };

  const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt(markdownOptions);

  md.use(require("markdown-it-footnote"));
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("md", function (value) {
    if (!value) {
      return "";
    }

    return md.render(value);
  });

  eleventyConfig.addPassthroughCopy({ "static/admin": "admin" });
  eleventyConfig.addPassthroughCopy("media");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
    },
  };
};

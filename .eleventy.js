module.exports = function (eleventyConfig) {
  const markdownOptions = {
    html: true,
  };

  const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt(markdownOptions);

  md.use(require("markdown-it-footnote"));

  // The netlify rich-text editor will change `^[` to `^\[`, 
  // which will break our footnotes. So we change it back here.
  md.core.ruler.after('normalize', 'footnote_fixer', (state) => {
    state.src = state.src.replace(/\^\\\[/g, "^[")
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("md", function (value) {
    if (!value) {
      return "";
    }

    return md.render(value);
  });

  eleventyConfig.addCollection("theoryNavigation", function(collection) {
    let categories = collection.getFilteredByTag("theoryCategories"); 
    return categories.map(_ => {
      return {
        data: _.data,
        articles: collection.getFilteredByTag("theory").filter(item => item.data.category === _.data.key)
      }
    })
  });
 


  eleventyConfig.addPassthroughCopy({ "static/admin": "admin" });
  eleventyConfig.addPassthroughCopy("mail");
  eleventyConfig.addPassthroughCopy("media");

  return {
    dir: { 
      input: "content",
      includes: "../_includes",
    },
  };
};

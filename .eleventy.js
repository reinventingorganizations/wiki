module.exports = function (eleventyConfig) {
  const markdownOptions = {
    html: true,
  };

  const MarkdownIt = require("markdown-it"),
    md = new MarkdownIt(markdownOptions).disable("code"),
    mdContainer = require("markdown-it-container");

  md.use(require("markdown-it-footnote"));
  md.use(mdContainer, "c-richtext");

  // The netlify rich-text editor will change `^[` to `^\[`,
  // which will break our footnotes. So we change it back here.
  md.core.ruler.after("normalize", "footnote_fixer", (state) => {
    state.src = state.src.replace(/\^\\\[/g, "^[");
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("md", function (value) {
    if (!value) {
      return "";
    }

    return md.render(value);
  });

  eleventyConfig.addFilter("translate", function (key) {
    const translations = require("./translations.json");
    return translations[key] || key;
  });

  const sortCategoryArticles = function(categories, collection) {
    return categories.map((_) => {
      return {
        data: _.data,
        articles: collection
            .getFilteredByTag("theory")
            .filter((item) => item.data.category === _.data.key)
            .sort((a, b) => {
              const value = (a.data.sortOrder || 0) - (b.data.sortOrder || 0);

              if (value === 0 && a.name && b.data.name) {
                return a.data.name.localeCompare(b.data.name)
              }
              console.log(value)
              return value;
            }),
      };
    });
  }

  eleventyConfig.addCollection("practicesNavigation", function (collection) {
    let categories = collection.getFilteredByTag("practicesTheoryCategories");
    return sortCategoryArticles(categories, collection);
  });

  eleventyConfig.addCollection("backgroundNavigation", function (collection) {
    let categories = collection.getFilteredByTag("backgroundTheoryCategories");
    return sortCategoryArticles(categories, collection);
  });

  eleventyConfig.addCollection("casesByName", function (collection) {
    return collection.getFilteredByTag("cases").sort((a, b) => {
      return a.data.name.localeCompare(b.data.name);
    });
  });

  eleventyConfig.addPassthroughCopy({ "static/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "static/images": "images" });
  eleventyConfig.addPassthroughCopy("mail");
  eleventyConfig.addPassthroughCopy("media");

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      output: "_output",
      data: "../_data",
    },
  };
};

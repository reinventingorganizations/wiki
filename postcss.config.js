console.log(process.env.NODE_ENV);

module.exports = {
  plugins: [
    require("postcss-import")({ path: "./src" }),
    require("postcss-css-variables"),
    require('cssnano')({
        preset: 'default',
    }),
  ],
};

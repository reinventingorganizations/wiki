
module.exports = {
    "mount": {
      "src": "/_dist_",
      "_output": "/",
    },
    "plugins": [
      ["@snowpack/plugin-webpack", {outputPattern: {js: '_dist_/main.js'}}],
      [
        "@snowpack/plugin-run-script",
        { "cmd": "eleventy", "watch": "$1 --watch" }
      ],
      process.env.NODE_ENV === 'production' ?
        ["@snowpack/plugin-run-script", { "cmd": "postcss src/main.css -o _output/_dist_/main.css"}] : 
        undefined
    ].filter(_ => Boolean(_))
  }
  

module.exports = {
    "mount": {
      "_output": "/",
      "src": "/_dist_"
    },
    "plugins": [
      [
        "@snowpack/plugin-run-script",
        { "cmd": "eleventy", "watch": "$1 --watch" }
      ],
      process.env.NODE_ENV === 'production' ?
        ["@snowpack/plugin-build-script", { "cmd": "postcss", "input": [".css"], "output": [".css"]}] : 
        undefined
    ].filter(_ => Boolean(_))
  }
  
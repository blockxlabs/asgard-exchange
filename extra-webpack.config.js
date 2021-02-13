module.exports = {
  node: {
    vm: true,
    stream: true
  },
  resolve: {
    alias: {
      "crypto": "crypto-browserify"
    },
    extensions: [".webpack.js", ".web.js", ".mjs", ".js", ".json"]
  },
  module:{
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      }
    ]
  }
}

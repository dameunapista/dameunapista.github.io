path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  // src folder's entry js - excluded from jekll's build process.
  entry: { 
    top: "./src/top.jsx",
    escapes: "./src/escapes.jsx",
    played: "./src/played.jsx"
  },
  output: {
      // we're going to put the generated file in the assets folder so jekyll will grab it.
      path: path.join(process.cwd(), 'js'),
      filename: "[name].bundle.js"
  },
  /*resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
  },*/
  module: {    
    rules: [
      {
        test: /\.jsx?$/,
        /*include: [
          path.resolve(__dirname, "src")
        ],*/
        exclude: /(node_modules)/,
        use:
        {
          loader: 'babel-loader',
          options: { 
            presets: ['react', 'es2015'] 
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  /*plugins: [
    new UglifyJSPlugin()
  ]*/
};
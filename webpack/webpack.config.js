const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: "production",
   entry: {
      background: path.resolve(__dirname, "..", "src", "background.ts"),
      popup: path.resolve(__dirname, "..", "src", "popup.js"),
      note: path.resolve(__dirname, "..", "src", "note.js"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            {from: ".", to: ".", context: "public"},
            {from: 'popup.html', to: '.', context: 'src'},
            {from: 'note.html', to: '.', context: 'src'}
        ]
      }),
   ],
};
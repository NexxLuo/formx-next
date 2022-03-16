const baseConfig = require("./webpack.base");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MonacoPlugin = require("monaco-editor-webpack-plugin");
const webpack = require("webpack");
const path = require("path");

const createPages = pages => {
  return pages.map(({ filename, template, chunk }) => {
    return new HtmlWebpackPlugin({
      filename,
      template,
      inject: "body",
      chunks: chunk
    });
  });
};

for (const key in baseConfig.entry) {
  if (Array.isArray(baseConfig.entry[key])) {
    baseConfig.entry[key].push(
      require.resolve("webpack/hot/dev-server"),
      `${require.resolve("webpack-dev-server/client")}?http://localhost:${PORT}`
    );
  }
}

const PORT = 3000;

module.exports = {
  ...baseConfig,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css"
    }),
    ...createPages([
      {
        filename: "index.html",
        template: path.resolve(__dirname, "./template.ejs"),
        chunk: ["playground"]
      },
      {
        filename: "preview.html",
        template: path.resolve(__dirname, "./template.ejs"),
        chunk: ["preview"]
      }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new MonacoPlugin({
      languages: ["json"]
    })
    // new BundleAnalyzerPlugin()
  ],
  devServer: {
    host: "0.0.0.0",
    open: false,
    port: PORT
  }
};

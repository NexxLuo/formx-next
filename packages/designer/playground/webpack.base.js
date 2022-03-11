const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

module.exports = {
  entry: {
    playground: path.resolve(__dirname, "./main")
  },
  mode: "development",
  devtool: prod ? "none" : "eval",
  target: "web",
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "dist"),
    port: 9000
  },
  output: {
    publicPath: "auto"
  },
  resolve: {
    symlinks: false,
    alias: {
      react: path.resolve("node_modules/react"),
      "react-dom": path.resolve("node_modules/react-dom"),
      "@platform/designable-react": path.resolve(
        "node_modules/@platform/designable-react"
      ),
      "@platform/designable-settings-form": path.resolve(
        "node_modules/@platform/designable-settings-form"
      ),
     
    },
    extensions: [".wasm", ".mjs", ".js", ".json", ".ts", ".tsx"]
  },
  snapshot: {
    managedPaths: [], //无此配置将导致symbolink包修改无法更新页面
    immutablePaths: []
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.jsx?$/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(less)(\?.*)?$/,
        resolve: {
          fullySpecified: false
        }
      },

      {
        test: /\.tsx?$/,
        loader: require.resolve("ts-loader"),
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, require.resolve("css-loader")]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                modules: true,
                modifyVars: undefined,
                javascriptEnabled: true,
                math: "always"
              }
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ["url-loader"]
      },
      {
        test: /\.html?$/,
        loader: require.resolve("file-loader"),
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  }
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const fs = require("fs");
const mode = process.env.NODE_ENV || "development";
const prod = mode === "production";

let fe = [
  "@formily/core",
  "@formily/path",
  "@formily/react",
  "@formily/reactive",
  "@formily/reactive-react",
  "@designable/core",
  "@designable/shared"
];

let allAlias = {};
for (let i = 0; i < fe.length; i++) {
  const pkg = fe[i];
  const pkg_path = path.resolve("../../node_modules/" + pkg);
  if (fs.existsSync(pkg_path)) {
    allAlias[pkg] = pkg_path;
  }
}

module.exports = {
  entry: {
    playground: path.resolve(__dirname, "./main"),
    preview: path.resolve(__dirname, "./preview")
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
      ...allAlias
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

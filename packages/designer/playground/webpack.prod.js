const baseConfig = require("./webpack.base");

module.exports = {
  ...baseConfig,
  mode: "production",
  optimization: {
    minimize: true
  }
};

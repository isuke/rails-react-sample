const path = require("path")

const AssetsPlugin = require("assets-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const { merge } = require("webpack-merge")

let config = {
  entry: "./app/frontend/main.tsx",
  output: {
    path: path.resolve(__dirname, "public", "dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new AssetsPlugin({ removeFullPathAutoPrefix: true })],
}

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config = merge(config, {
      output: {
        filename: "build.js",
        publicPath: "http://localhost:3001/",
      },
      devtool: "eval",
      devServer: {
        port: "3001",
        hot: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
          "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        },
      },
    })
  } else if (argv.mode === "production") {
    config = merge(config, {
      output: {
        filename: "build-[fullhash].js",
        publicPath: "dist/",
      },
      plugins: [new CleanWebpackPlugin()],
    })
  }

  return config
}

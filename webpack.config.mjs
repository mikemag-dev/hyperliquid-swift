// webpack.config.mjs
import path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";
import NodePolyfillPlugin from "node-polyfill-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: "production",
  target: ["web", "es2022"],

  entry: [
    "./src/polyfills.ts", // Use .ts directly
    "./src/index.ts",
    "./src/api.ts",
  ],

  output: {
    filename: "hyperliquid.min.js",
    path: path.resolve(__dirname, "dist"),
    library: "Hyperliquid",
    libraryTarget: "umd",
    globalObject: "this",
    clean: true,
  },

  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "process/browser": "process/browser.js",
    },
    fallback: {
      crypto: "crypto-browserify",
      buffer: "buffer",
      process: "process/browser.js",
      stream: "stream-browserify",
      vm: "vm-browserify",
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser.js",
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
};

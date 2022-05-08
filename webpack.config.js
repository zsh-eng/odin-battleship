const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
	mode: "development", // Development or Production
	entry: "./src/index.js", // entry point for building dependency graph
	output: {
		path: path.resolve(__dirname, "dist"),
		// Filenames can be dynamic
		filename: "[name].bundle.js",
		// Removes unused files from /dist folder
		clean: true,
	},
	// Map to original source code for easier debugging
	// NOT for production
	devtool: "inline-source-map",
	// Rudimentary web server with live reloading
	// npm install --save-dev webpack-dev-server
	devServer: {
		static: "./dist",
	},
	module: {
		rules: [
			{
				// Import CSS from within JS file
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				// Images
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource", // Built in module
			},
			{
				// Fonts (Add with @font-face in CSS)
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
			},
		],
	},
	// Note: npm install --save-dev html-webpack-plugin
	plugins: [new HtmlWebpackPlugin({ template: './dist/index.html' })],
}

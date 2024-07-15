const path = require("path");
const webpack = require("webpack");
const externals = require("webpack-node-externals");
const { name, author, version } = require("./package.json");
const dotenv = require("dotenv");
const TerserPlugin = require('terser-webpack-plugin');

const copyright = new webpack.BannerPlugin({
	banner: `Copyright (c) 2024.
Alberto Organista Ramírez. (https://www.soybeto.dev) - All rights reserved.
Project Name: ${name}
Version: ${version}
Hash: [fullhash]`
});

/**
 * @param { boolean } env.production
 * @param { string } env.dotenv
 * */
module.exports = (env) => {
	console.log(env);
	if (env.dotenv)
		dotenv.config({
			override: true,
			path: path.resolve(__dirname, ".env." + env.dotenv)
		});
	return [({
		entry: {
			"server": "./server.js"
		},
		output: {
			path: path.resolve(__dirname, "build"),
			filename: "[name].js"
		},
		target: "node",
		node: {
			__dirname: false, __filename: false
		},
		mode: env && env.production ? "production" : "development",
		resolve: {
			extensions: [".js"]
		},
		devtool: "source-map",
		module: {
			rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: []
					}
				}
			}]
		},
		externals: [externals()],
		plugins: [
			copyright,
			new webpack.DefinePlugin({
				PACKAGE_NAME				: JSON.stringify(name),
				PACKAGE_AUTHOR				: JSON.stringify(author),
				PACKAGE_VERSION				: JSON.stringify(version)
			})
		],
		optimization: {
			minimizer: [new TerserPlugin({
				extractComments: false
			})]
		}
	})]
};
/* eslint-disable func-names */
exports.pages = function (entry) {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const fs = require('fs');
  const path = require('path');
  const viewsFolder = path.resolve(__dirname, '../src/views/pages');

  const pages = [];
  fs.readdirSync(viewsFolder).forEach((view) => {
    const viewName = view.split('.')[0];

    const options = {
      filename: `${viewName}.html`,
      template: `views/pages/${view}`,
      inject: true,
      chunks: ['app', 'index'],
    };
    // const options_JP = {
    //   filename: `${viewName}/index_JP.html`,
    //   template: `views/pages/${view}`,
    //   inject: true,
    //   chunks: ['app_JP', 'index'],
    // };

    // INFO: https://webpack.js.org/plugins/html-webpack-plugin/
    pages.push(new HtmlWebpackPlugin(options));
    // pages.push(new HtmlWebpackPlugin(options_JP));
  });

  return pages;
};

exports.pagescard = function (entry) {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const fs = require('fs');
  const path = require('path');
  const viewsFolder = path.resolve(__dirname, '../src/views/pages-card');

  const pagescard = [];
  fs.readdirSync(viewsFolder).forEach((view) => {
    const viewName = view.split('.')[0];

    const options = {
      filename: `${viewName}.html`,
      template: `views/pages-card/${view}`,
      inject: true,
      chunks: ['app', 'index'],
    };
    // const options_JP = {
    //   filename: `${viewName}/index_JP.html`,
    //   template: `views/pages/${view}`,
    //   inject: true,
    //   chunks: ['app_JP', 'index'],
    // };

    // INFO: https://webpack.js.org/plugins/html-webpack-plugin/
    pagescard.push(new HtmlWebpackPlugin(options));
    // pages.push(new HtmlWebpackPlugin(options_JP));
  });

  return pagescard;
};

var webpack = require('webpack')
var express = require("express");
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var env = process.env.NODE_ENV;
var prod = env === "development" ? false : true ;
var config = require('./webpack.config')({prod : prod})
var app = express();
var port = 3002;
var bodyParser = require('body-parser')


import indexApi from "./server/api/general";


var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.urlencoded({ extended: true }))

indexApi(app);
app.get("*",function(req,res) {
	res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==>  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
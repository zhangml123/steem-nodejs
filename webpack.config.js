var path = require('path')
var webpack = require('webpack')
var HtmlwebpackPlugin = require('html-webpack-plugin')

var root_dir = path.resolve(__dirname);

module.exports = function(env){
  var cssLoaders = [
      {
            loader: "style-loader"
        },
        {
            loader: "css-loader"
        },
        {
            loader: "postcss-loader"
        }

    ];
  var scssLoaders = [
        {
            loader: "style-loader"
        },
        {
            loader: "css-loader"
        },
        {
            loader: "postcss-loader",
            options: {
                plugins: [require("autoprefixer")]
            }
        },
        {
            loader: "sass-loader",
            options: {
                outputStyle: "expanded"
            }
        }

    ]
  var config =  {
      devtool: 'cheap-module-eval-source-map',
      entry: [
        "react-hot-loader/patch",
        "webpack-hot-middleware/client",
        './index'
      ],
      output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
      },
      plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlwebpackPlugin({
          title:"react-redux",
          template: './index-template.html', // Load a custom template
          inject: 'body' // Inject all scripts into the body  
        })
      ],
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loaders: 'babel-loader',
            exclude: /node_modules/,
           
          }, 
          {
            test: /\.js$/,
            loaders: [ 'babel-loader' ],
            exclude: /node_modules/,
            include: __dirname
          }, 
          {
            test: /\.css$/,
            loader: cssLoaders
          },
          {
            test: /\.scss$/,
            loader: scssLoaders
          },
          {
            test: /\.png$/,
            exclude:path.resolve(root_dir, "app/assets/images"),
            use: [
                {
                    loader: "url-loader",
                    options: {
                        limit: 100000
                    }
                }
            ]
          },
        ],

      }, 
       resolve: {
                alias: {
                    db: path.join(__dirname, "./db")
                },
                extensions: [".js", ".jsx", ".coffee", ".json"],
                // fallback: [path.resolve(root_dir, "./node_modules")]
        },

    };
    if(env.prod === true ){
      config.entry = [
        //'webpack-hot-middleware/client',
        './index'
      ]}
    return config;
}


const path = require('path')
var webpack = require('webpack')
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevelopment = process.env.NODE_ENV === 'development'
module.exports={
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  mode: 'development', 
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    hot: true
  },
  module: {
    rules: [{
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        // 排除node_modules底下的
        exclude: /node_modules/,
        include: path.join(__dirname, './src')
    },
    {
      test: /\.css$/, // 正则匹配文件路径
      exclude: /node_modules/,
      use: [
        // 注意loader生效是从下往上的
        'style-loader',
        'css-loader',
        'postcss-loader', // 加了这一行
      ]
   },
  //  {
  //   test: /\.scss$/,
  //   include: path.join(__dirname, './src'),
  //   use: [
  //     'style-loader',
  //     'css-loader',
  //     'postcss-loader', // 加了这一行
  //     'sass-loader'
  //     ]
  //  },
   {
      test: /\.module\.s(a|c)ss$/,
      use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
              options: {
                modules: true,
                    sourceMap: isDevelopment
                  }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
              options: {
                sourceMap: isDevelopment
              }
          }
        ]
      },
          {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            use: [
              isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: isDevelopment
                }
             }
           ]
   },
   {
    // for ant design
    test: /\.less$/,
    include: resolve('../node_modules'),
    use: [
      'style-loader',
      'css-loader',
      'postcss-loader',
      {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: resolve('theme')
        }
      }
    ]
   },
   {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    use: [
      {
      loader: 'url-loader',
      options: {
        //1024 == 1kb  
        //小于10kb时打包成base64编码的图片否则单独打包成图片
        limit: 10240,
        name: path.join('img/[name].[hash:7].[ext]')
      }
    }]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 10240,
        name: path.join('font/[name].[hash:7].[ext]')
      }
    }]
  }
  ]},
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
    }),
    require('autoprefixer')
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx','.scss','.less']
  }
}
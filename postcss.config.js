module.exports = {
  plugins: [
      require('postcss-simple-vars')({ /* ...options */ }),
      require('postcss-nested')({ /* ...options */ }),
      require('autoprefixer')({ /* ...options */ })
  ]
}

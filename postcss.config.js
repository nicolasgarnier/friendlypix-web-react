module.exports = (ctx) => ({
  plugins: [
    require('autoprefixer')({
      browserslist: ['> 1%', 'last 2 versions']
    })
  ],
});

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['src/theme']
    }),
    require('postcss-mixins')({
      mixinsDir: ['src/common/theme/mixins']
    }),
    require('postcss-cssnext')({
      browsers: ['last 2 versions']
    }),
    require('postcss-inline-svg')(),
    require('postcss-svgo')()
  ]
}

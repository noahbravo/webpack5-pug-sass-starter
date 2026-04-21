/** @type {import('stylelint').Config} */
module.exports = {
  customSyntax: 'postcss-sass',

  rules: {
    'block-no-empty': true,
    'color-no-invalid-hex': true,
    'at-rule-no-unknown': null,
    'no-empty-source': null
  },

  ignoreFiles: ['dist/**/*', 'node_modules/**/*']
}

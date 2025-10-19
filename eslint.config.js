// eslint.config.js
export default [
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { window: 'readonly', document: 'readonly', console: 'readonly' }
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn'
    }
  }
]

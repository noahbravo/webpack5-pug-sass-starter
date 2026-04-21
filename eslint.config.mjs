import js from '@eslint/js'
import prettier from 'eslint-plugin-prettier'
import importPlugin from 'eslint-plugin-import'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import globals from 'globals'

export default [
  {
    ignores: ['dist', 'node_modules']
  },

  {
    ...js.configs.recommended
  },

  {
    files: ['src/**/*.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.sass']
        }
      }
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      prettier
    },
    rules: {
      ...promisePlugin.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...nPlugin.configs['recommended-module'].rules,

      'prettier/prettier': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      'import/order': [
        'warn',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always'
        }
      ]
    }
  },

  {
    files: ['tests/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.vitest
      }
    }
  }
]

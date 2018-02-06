module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true
  },

  rules: {
    'no-unused-expressions': 'off',
    camelcase: 'off',
    'object-curly-newline': 'off',
    'spaced-comment': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore'
      }
    ],

    'max-len': [
      'error',
      100,
      {
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true
      }
    ],

    'react/no-danger': 'off',
    'react/require-default-prop': 'off',
    'react/sort-comp': 'off',
    'react/no-array-index-key': 'off',
    'react/no-typos': 'off'
  },

  settings: {
    'import/resolver': {
      webpack: {}
    }
  }
};

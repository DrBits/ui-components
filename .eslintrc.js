module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb'],
  env: {
    browser: true,
    node: true,
  },

  rules: {
    'no-unused-expressions': 'off',
    'no-console': 0,
    camelcase: 'off',
    'object-curly-newline': 'off',
    'spaced-comment': 'off',
    'one-var': [
      'error',
      {
        let: 'never',
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'max-len': [
      'error',
      100,
      {
        ignoreTrailingComments: true,
        ignoreComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],

    'react/no-danger': 'off',
    'react/require-default-prop': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': 'off',
    'react/no-array-index-key': 'off',
    'react/no-typos': 'off',
  },

  settings: {
    'import/resolver': {
      webpack: {},
    },
  },
};

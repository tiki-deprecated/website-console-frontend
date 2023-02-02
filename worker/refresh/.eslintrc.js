/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['standard', 'plugin:prettier/recommended'],
  overrides: [
    {
      files: ['test/**'],
      plugins: ['jest', 'prettier'],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}

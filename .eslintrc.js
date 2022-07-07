module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:mocha/recommended",
    "plugin:prettier/recommended",
    "airbnb-typescript/base"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
};

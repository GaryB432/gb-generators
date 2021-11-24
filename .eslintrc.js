module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    es2021: true,
    jest: true,
  },
  plugins: ['gb'],
  extends: [
    'plugin:gb/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    '@typescript-eslint/member-ordering': 'off'
  }
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:jsx-a11y/recommended',
    'next',
    'prettier',
    'next/core-web-vitals',
    'plugin:prettier/recommended' // always at the end
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'react-hooks/rules-of-hooks': 'off',
    'react/display-name': 'off'
  }
}

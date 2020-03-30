module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "define": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    'no-console': 'off',
  }
}

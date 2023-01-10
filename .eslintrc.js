module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: ["eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    indent: ["error", 2],
    "no-console": "off",
    "max-len": ["error", { code: 120 }],
    quotes: ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
  },
};

module.exports = {
  root: true,
  env: {
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
    semi: [2, "never"],
    "no-console": "off",
    "max-len": ["error", { code: 120 }],
    "quotes": ["error", "double"],
    "comma-dangle": ["error", "always-multiline"],
  },
}

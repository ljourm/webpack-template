module.exports = {
  "plugins": [
    "stylelint-scss",
    "stylelint-prettier",
  ],
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-standard-scss",
    "stylelint-config-rational-order",
  ],
  "rules": {
    "scss/dollar-variable-colon-space-after": "always",
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
    "no-empty-source": null,
    "no-descending-specificity": null,
    "prettier/prettier": true,
  },
  "ignoreFiles": [
    "dist/**",
    "sites/**/vendor/**",
  ],
}

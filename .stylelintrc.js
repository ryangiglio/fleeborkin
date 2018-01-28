module.exports = {
  extends: "stylelint-config-standard",
  rules: {
    "at-rule-no-unknown": [true, {
      ignoreAtRules: [
        'content',
        'each',
        'else',
        'extend',
        'if',
        'include',
        'mixin',
      ]
    }],
    "declaration-block-no-redundant-longhand-properties": null,
    "number-leading-zero": null,
    "declaration-empty-line-before": null,
  }
}

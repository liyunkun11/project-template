import antfu from "@antfu/eslint-config";

export default antfu(
  {
    formatters: true,
    vue: true,
  },
  {
    rules: {
      "style/semi": ["error", "always"],
      "style/quotes": ["error", "double"],
      "curly": ["error", "all"],
      "no-console": "off",
      "import/no-self-import": "off",
      "antfu/top-level-function": "off",
      "no-use-before-define": "off",
      "ts/no-use-before-define": "off",
      "perfectionist/sort-imports": "error",
    },
  },
  {
    files: ["**/*.vue"],
    rules: {
      "vue/max-attributes-per-line": ["error", {
        singleline: {
          max: 9,
        },
        multiline: {
          max: 1,
        },
      }],
      "vue/block-order": ["error", {
        order: ["template", "script", "style"],
      }],
      "vue/no-mutating-props": "off",
    },
  },
);

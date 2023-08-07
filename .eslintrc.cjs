module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard-with-typescript", "plugin:vue/vue3-recommended", "plugin:prettier/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json"],
    extraFileExtensions: [".vue"],
  },
  plugins: ["vue"],
  rules: {
    // typescript
    "@typescript-eslint/strict-boolean-expressions": "off",

    // vue
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: ["index"],
      },
    ],
  },
};

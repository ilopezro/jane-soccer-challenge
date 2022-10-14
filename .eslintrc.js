module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "standard-with-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.md"],
      parser: "eslint-plugin-markdownlint/parser",
      extends: ["plugin:markdownlint/recommended"],
      rules: {
        "prettier/prettier": ["error", { parser: "markdown" }],
      },
    },
    {
      files: ["*.spec.ts"],
      plugins: ["jest"],
      extends: ["plugin:jest/recommended"],
      env: {
        "jest/globals": true,
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "tsconfig.json",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
};

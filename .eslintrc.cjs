/* eslint-env node */

module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    'eslint-config-prettier', 
    'prettier'
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: [
    "react-refresh",
    "perfectionist",
    "prettier",
    "react-hooks"
  ],
  rules: {
    "react-refresh/only-export-components": "warn",
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  },
  ignorePatterns: [
    ".eslintrc.js",
    "node_modules/",
    "config-overrides.js",
    'vite.config.ts'
  ],
};

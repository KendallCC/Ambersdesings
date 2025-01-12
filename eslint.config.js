export default {
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint", "react-hooks", "react-refresh"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react-refresh/only-export-components": "warn" // Advertencia para componentes exportados incorrectamente
  },
};

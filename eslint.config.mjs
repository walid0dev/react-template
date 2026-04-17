import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.app.json", "./tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname, 
      },
    },
    rules: {
      ...hooksPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off", // Not needed in modern React

      // --- NAMING CONVENTIONS ---
      "@typescript-eslint/naming-convention": [
        "error",
        // Force PascalCase for Components and Types
        {
          selector: ["typeLike", "interface"],
          format: ["PascalCase"],
        },
        // Force camelCase for variables and hooks
        {
          selector: ["variable", "function"],
          format: ["camelCase", "PascalCase"], // Pascal allowed for components
        },
        // Enforce 'use' prefix for hooks
        {
          selector: "function",
          filter: { regex: "^use[A-Z]", match: true },
          format: ["camelCase"],
        },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
  prettierConfig // Must be last to override style rules
);
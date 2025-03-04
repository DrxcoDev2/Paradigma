import globals from "globals";
import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config'} */
export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser, // Usa el parser de TypeScript
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn", // Evita variables sin usar
      "@typescript-eslint/explicit-module-boundary-types": "off", // Opcional, depende de tu preferencia
    },
  },
];

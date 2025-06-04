export default tseslint.config(
  -{ ignores: ["dist"] },
  +{ ignores: ["dist", "src/tinymce"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);

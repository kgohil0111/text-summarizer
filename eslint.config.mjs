import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js + TypeScript defaults
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add Prettier integration
  ...compat.extends("plugin:prettier/recommended"),

  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // Show Prettier issues as ESLint warnings
      "prettier/prettier": "warn",
    },
  },
];

export default eslintConfig;

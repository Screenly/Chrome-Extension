import jasmine from "eslint-plugin-jasmine";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("eslint:recommended", "plugin:jasmine/recommended"), {
    plugins: {
        jasmine,
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.jasmine,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
        },

        ecmaVersion: 2018,
        sourceType: "module",
    },

    rules: {},
}];
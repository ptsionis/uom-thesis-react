import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import jsxRuntimeConfig from "eslint-plugin-react/configs/jsx-runtime.js";

import eslintJs from "@eslint/js";
const { configs: eslintRecommendedConfigs } = eslintJs;

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...eslintRecommendedConfigs.recommended.rules,
      ...jsxRuntimeConfig.rules,
    },
  },
];

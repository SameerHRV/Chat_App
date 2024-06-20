import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        process: true,
      },
    },
  },
  pluginJs.configs.recommended,
];

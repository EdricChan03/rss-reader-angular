// @ts-check

// Allows us to bring in the recommended core rules from eslint itself
import eslint from "@eslint/js";
const { configs } = eslint;

// Allows us to use the typed utility for our config, and to bring in the recommended rules for TypeScript projects from typescript-eslint
import { config, configs as tsConfigs } from "typescript-eslint";

// Allows us to bring in the recommended rules for Angular projects from angular-eslint
import {
  configs as angularConfigs,
  processInlineTemplates,
} from "angular-eslint";

// Stylistic rules
import stylistic from "@stylistic/eslint-plugin";

const stylisticConfig = stylistic.configs.customize({
  flat: true,
  indent: 2,
  quotes: "single",
  semi: true,

});

// Export our config array, which is composed together thanks to the typed utility function from typescript-eslint
export default config(
  {
    files: ["**/*.js"],
    extends: [
      stylisticConfig,
      configs.recommended
    ]
  },
  {
    // Everything in this config object targets our TypeScript files (Components, Directives, Pipes etc)
    files: ["**/*.ts"],
    extends: [
      stylisticConfig,
      // Apply the recommended core rules
      configs.recommended,
      // Apply the recommended TypeScript rules
      ...tsConfigs.recommended,
      // Optionally apply stylistic rules from typescript-eslint that improve code consistency
      ...tsConfigs.stylistic,
      // Apply the recommended Angular rules
      ...angularConfigs.tsRecommended,
      // stylistic.configs["recommended-flat"],
    ],
    // Set the custom processor which will allow us to have our inline Component templates extracted
    // and treated as if they are HTML files (and therefore have the .html config below applied to them)
    processor: processInlineTemplates,
    // Override specific rules for TypeScript files (these will take priority over the extended configs above)
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
    },
  },
  {
    // Everything in this config object targets our HTML files (external templates,
    // and inline templates as long as we have the `processor` set on our TypeScript config above)
    files: ["**/*.html"],
    extends: [
      // Apply the recommended Angular template rules
      ...angularConfigs.templateRecommended,
      // Apply the Angular template rules which focus on accessibility of our apps
      ...angularConfigs.templateAccessibility
    ],
    rules: {},
  },
);

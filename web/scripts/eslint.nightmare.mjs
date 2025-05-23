import eslint from "@eslint/js";
import tsparser from "@typescript-eslint/parser";
import litconf from "eslint-plugin-lit";
import wcconf from "eslint-plugin-wc";
import globals from "globals";
import tseslint from "typescript-eslint";

const MAX_DEPTH = 4;
const MAX_NESTED_CALLBACKS = 4;
const MAX_PARAMS = 5;

// Waiting for SonarJS to be compatible
// const MAX_COGNITIVE_COMPLEXITY = 9;

const rules = {
    "accessor-pairs": "error",
    "array-callback-return": "error",
    "block-scoped-var": "error",
    "consistent-return": "error",
    "consistent-this": ["error", "that"],
    "curly": ["error", "all"],
    "dot-notation": [
        "error",
        {
            allowKeywords: true,
        },
    ],
    "eqeqeq": "error",
    "func-names": "error",
    "guard-for-in": "error",
    "max-depth": ["error", MAX_DEPTH],
    "max-nested-callbacks": ["error", MAX_NESTED_CALLBACKS],
    "max-params": ["error", MAX_PARAMS],
    "new-cap": "error",
    "no-alert": "error",
    "no-array-constructor": "error",
    "no-bitwise": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-constant-condition": "error",
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-div-regex": "error",
    "no-dupe-args": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-else-return": "error",
    "no-empty": "error",
    "no-empty-character-class": "error",
    "no-empty-function": "error",
    "no-labels": "error",
    "no-eq-null": "error",
    "no-eval": "error",
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-label": "error",
    "no-fallthrough": "error",
    "no-func-assign": "error",
    "no-implied-eval": "error",
    "no-implicit-coercion": "error",
    "no-implicit-globals": "error",
    "no-inner-declarations": ["error", "functions"],
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-iterator": "error",
    "no-invalid-this": "error",
    "no-label-var": "error",
    "no-lone-blocks": "error",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": ["error", { ignore: [0, 1, -1] }],
    "no-multi-str": "error",
    "no-negated-condition": "error",
    "no-nested-ternary": "error",
    "no-new": "error",
    "no-new-func": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-redeclare": "error",
    "no-regex-spaces": "error",
    "no-restricted-syntax": ["error", "WithStatement"],
    "no-script-url": "error",
    "no-self-assign": "error",
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-unexpected-multiline": "error",
    "no-useless-constructor": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": "error",
    "no-unreachable": "error",
    "no-unused-expressions": "error",
    "no-unused-labels": "error",
    "no-use-before-define": "error",
    "no-useless-call": "error",
    "no-dupe-class-members": "error",
    "no-var": "error",
    "no-void": "error",
    "no-with": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "radix": "error",
    "require-yield": "error",
    "strict": ["error", "global"],
    "use-isnan": "error",
    "valid-typeof": "error",
    "vars-on-top": "error",
    "yoda": ["error", "never"],

    "no-unused-vars": "off",
    "no-console": ["error", { allow: ["debug", "warn", "error"] }],
    // SonarJS is not yet compatible with ESLint 9.  Commenting these out
    // until it is.
    //    "sonarjs/cognitive-complexity": ["off", MAX_COGNITIVE_COMPLEXITY],
    //    "sonarjs/no-duplicate-string": "off",
    //    "sonarjs/no-nested-template-literals": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unused-vars": [
        "error",
        {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
        },
    ],
};

export default [
    // You would not believe how much this change has frustrated users: ["if an ignores key is used
    // without any other keys in the configuration object, then the patterns act as global
    // ignores"](https://eslint.org/docs/latest/use/configure/ignore)
    {
        ignores: [
            "dist/",
            ".wireit/",
            "packages/",
            // don't ever lint node_modules
            "node_modules/",
            ".storybook/*",
            // don't lint build output (make sure it's set to your correct build folder name)
            // don't lint nyc coverage output
            "coverage/",
            "src/locale-codes.ts",
            "storybook-static/",
            "src/locales/",
            "src/**/*.test.ts",
        ],
    },
    eslint.configs.recommended,
    wcconf.configs["flat/recommended"],
    litconf.configs["flat/recommended"],
    ...tseslint.configs.recommended,
    //     sonar.configs.recommended,
    {
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 12,
                sourceType: "module",
            },
            globals: {
                ...globals.browser,
            },
        },
        files: ["src/**"],
        rules,
    },
    {
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 12,
                sourceType: "module",
            },
            globals: {
                ...globals.nodeBuiltin,
            },
        },
        files: ["scripts/*.mjs", "*.ts", "*.mjs"],
        rules,
    },
    {
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 12,
                sourceType: "module",
            },
            globals: {
                ...globals.nodeBuiltin,
                ...globals.jest,
            },
        },
        files: ["src/**/*.test.ts"],
        rules,
    },
];

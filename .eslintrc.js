const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
    // 'extends': [
    //   'eslint:recommended',
    //   'plugin:react/recommended'
    // ],
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6, // 2018
    sourceType: 'module',
    ecmaFeatures: {
      // 'experimentalObjectRestSpread': true,
      jsx: true,
    },
    'allowImportExportEverywhere': true
  },
  rules: {
    'prettier/prettier': ['warn', prettierOptions], // Warning because prettier and eslint sometimes conflict with each other
    'arrow-body-style': [2, 'as-needed'],
    'camelcase': 0,
    'class-methods-use-this': 0,
    'import/first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      'error',
      'tab',
      {
        'SwitchCase': 1
      }
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/href-no-hash': 'off', // Workaround for jsx-a11y/href-no-hash
    'jsx-a11y/anchor-is-valid': ['warn', { 'aspects': ['invalidHref'] }], // Workaround for jsx-a11y/href-no-hash
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'linebreak-style': [
      'error',
      'unix'
    ],
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    // 'no-param-reassign': [
    //   2,
    //   {
    //     'ignorePropertyModificationsFor': ['state']
    //   }
    // ],
    'no-shadow': 2, // Only until we upgrade to react-boilerplate 5.0
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-fragments': [2, 'element'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2, // 1
    'react/prefer-stateless-function': 1,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'require-yield': 0,
    'semi': [
      'error',
      'never'
    ],
    'react/style-prop-object': 2,
  },
};
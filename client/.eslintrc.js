module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react/recommended',
      'prettier',
      'plugin:prettier/recommended',
      'plugin:@next/next/recommended',
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      'react/react-in-jsx-scope': 0,
      '@typescript-eslint/no-unused-vars': 2,
      '@typescript-eslint/no-explicit-any': 0,
      'react/display-name': 0,
      'react/prop-types': 0,
      '@typescript-eslint/no-non-null-assertion': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
    env: {
      browser: true,
      node: true,
    },
  };
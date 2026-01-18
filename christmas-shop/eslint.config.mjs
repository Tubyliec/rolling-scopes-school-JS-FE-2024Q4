import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['**/node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {},
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  prettier,
];

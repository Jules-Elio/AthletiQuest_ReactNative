import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "**/*.cjs", // ignore tous les fichiers .cjs
    ],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
  {
    files: ['*.js'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
      },
    },
  },
  {
    files: ['e2e/**/*.js'],
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        beforeAll: 'readonly',
        beforeEach: 'readonly',
        expect: 'readonly',
        element: 'readonly',
        by: 'readonly',
        device: 'readonly',
      },
    },
  },
];
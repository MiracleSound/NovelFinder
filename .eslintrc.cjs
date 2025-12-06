module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: ['./apps/api/tsconfig.json', './apps/web/tsconfig.json'],
      },
    },
    tailwindcss: {
      config: 'apps/web/tailwind.config.ts',
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import', 'tailwindcss'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/enforces-shorthand': 'off',
    'tailwindcss/migration-from-tailwind-2': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
  ignorePatterns: ['dist', 'build', 'node_modules', '**/*.config.cjs', '**/*.config.js', '**/*.d.ts'],
  overrides: [
    {
      files: ['apps/api/**/*.{ts,tsx}'],
      env: { node: true, browser: false },
    },
    {
      files: ['apps/web/**/*.{ts,tsx}'],
      env: { browser: true, node: false },
    },
  ],
};

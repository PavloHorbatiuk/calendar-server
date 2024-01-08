module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint/eslint-plugin', '@darraghor/nestjs-typed', 'eslint-plugin-import'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@darraghor/nestjs-typed/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "quotes": ["error", "single"],
    '@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/indent': ['error', 'tab', {
      ignoredNodes: ['PropertyDefinition']
    }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE'],
      },
      {
        selector: ['function'],
        format: ['camelCase', 'PascalCase'],
      },
      {
        selector: 'variableLike',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
        trailingUnderscore: 'forbid',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
    'object-curly-spacing': ['error', 'always'],
    'no-console': 'error',
    'padded-blocks': ['error', 'never'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-trailing-spaces': 'error',
    'space-infix-ops': 'error',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 0, 'maxEOF': 1 }],
    'keyword-spacing': ['error', { before: true, after: true }],
    'lines-between-class-members': ['error',
      {
        enforce: [
          { blankLine: "always", prev: "*", next: "method" },
          { blankLine: "always", prev: "method", next: "*" },
          // { blankLine: "never", prev: "field", next: "field" },
        ]
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: ['return', 'throw', 'try'] },
      { blankLine: 'always', prev: 'function', next: '*' },
      { blankLine: 'always', prev: '*', next: 'export' },
    ],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index'], 'object', 'type'],
        pathGroups: [
          {
            pattern: '**/*.+(css|scss|sass)',
            group: 'object',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};
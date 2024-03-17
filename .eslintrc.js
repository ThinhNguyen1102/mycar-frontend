module.exports = {
  extends: ['react-app', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['react', '@typescript-eslint/eslint-plugin', 'prettier'],
  ignorePatterns: ['.eslintrc.js', '.config-overrides.js'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'avoid',
        semi: false,
        trailingComma: 'none',
        endOfLine: 'lf',
        tabWidth: 2,
        useTabs: false,
        singleQuote: true,
        printWidth: 100,
        jsxSingleQuote: false,
        bracketSpacing: false
      }
    ]
  }
}

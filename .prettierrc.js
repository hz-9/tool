// Configuration reference: https://prettier.io/en/configuration.html

module.exports = {
  plugins: [
    './common/autoinstallers/rush-prettier/node_modules/@trivago/prettier-plugin-sort-imports/lib/src/index.js',
  ],

  // Use a larger print width because Prettier's line wrapping seems to be for JavaScript without comments.
  printWidth: 120,

  // Use lf as the end of line sequence for all files.
  endOfLine: 'lf',

  // Use single quotes instead of double quotes.
  singleQuote: true,

  // For ES5, trailing commas cannot be used for function parameters, so they can only be used for arrays.
  trailingComma: 'es5',

  // Use parentheses around arrow function parameters always.
  arrowParens: 'always',

  // Disable semicolons at the end of lines.
  semi: false,

  // Place the closing bracket of a block on a new line.
  bracketSameLine: false,

  // Set htmlWhitespaceSensitivity to ignore to ensure reasonable configuration for Vue.
  htmlWhitespaceSensitivity: 'ignore',

  // Force each attribute in html, vue, and jsx to be on a separate line.
  singleAttributePerLine: true,

  // @trivago/prettier-plugin-sort-imports
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^@hz9/(.*)$', '^@hz9-(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,

  importOrderParserPlugins: ['typescript', 'classProperties', 'decorators-legacy'],
}

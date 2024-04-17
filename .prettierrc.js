// 配置可参考 https://prettier.io/en/configuration.html

module.exports = {
  plugins: ['./common/autoinstallers/rush-prettier/node_modules/@trivago/prettier-plugin-sort-imports'],

  // 使用较大的打印宽度，因为 Prettier 的换行设置似乎是针对没有注释的 JavaScript.
  printWidth: 120,

  // 全部使用 lf 作为 行尾序列
  endOfLine: 'lf',

  // 单引号代替双引号
  singleQuote: true,

  // 对于 ES5 而言, 尾逗号不能用于函数参数，因此使用它们只能用于数组
  trailingComma: 'es5',

  // 箭头函数
  arrowParens: 'always',

  // 行尾分号
  semi: false,

  // false 将 > 放在单独一行
  bracketSameLine: false,

  // html 空白敏感度，需要设置为 ignore，来保证 vue 的合理化配置
  htmlWhitespaceSensitivity: 'ignore',

  // 是 html vue jsx 中每行强制使用单个属性
  singleAttributePerLine: true,

  // imports
  importOrder: ['^@core/(.*)$', '^@server/(.*)$', '^@ui/(.*)$', '^@hz9/(.*)$', '^@hz9-(.*)$', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
}

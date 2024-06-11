/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-05-10 14:25:56
 */

// eslint-disable-next-line import/no-unresolved
require('@hz9/eslint-config-airbnb-ts/modern-module-resolution')

module.exports = {
  extends: ['@hz9/eslint-config-airbnb-ts/node-rushstack'],
  parserOptions: { tsconfigRootDir: __dirname },

  rules: {},
}

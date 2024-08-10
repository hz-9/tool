/**
 * @Author       : Chen Zhen
 * @Date         : 2024-05-10 00:00:00
 * @LastEditors  : Chen Zhen
 * @LastEditTime : 2024-07-26 20:35:06
 */

// eslint-disable-next-line import/no-unresolved
require('@hz-9/eslint-config-airbnb-ts/modern-module-resolution')

module.exports = {
  extends: ['@hz-9/eslint-config-airbnb-ts/node-rushstack'],
  parserOptions: { tsconfigRootDir: __dirname },

  rules: {
    'max-classes-per-file': 'off',
  },
}

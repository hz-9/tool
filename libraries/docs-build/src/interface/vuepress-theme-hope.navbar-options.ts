/**
 * @internal
 *
 * Base nav item, displayed as text
 */
export interface INavItemOptions {
  /**
   * Text of item
   *
   * 项目文字
   */
  text: string
  /**
   * Icon of item
   *
   * 项目图标
   */
  icon?: string
  /**
   * Aria label of item
   *
   * 项目无障碍标签
   */
  ariaLabel?: string
}
/**
 * @internal
 *
 * Options for `<AutoLink>`
 */
export interface IAutoLinkOptions extends INavItemOptions {
  /**
   * Link of item
   *
   * 当前页面链接
   */
  link: string
  /**
   * Rel of `<a>` tag
   *
   * `<a>` 标签的 `rel` 属性
   */
  rel?: string
  /**
   * Target of `<a>` tag
   *
   * `<a>` 标签的 `target` 属性
   */
  target?: string
  /**
   * RegExp mode to be active
   *
   * 匹配激活的正则表达式
   */
  activeMatch?: string
  /**
   * Whether it's active only when exact match
   *
   * 是否仅在完全匹配时激活
   */
  exact?: boolean
}

interface INavGroup<T> extends INavItemOptions {
  /**
   * Link prefix of current group
   *
   * 当前分组的页面前缀
   */
  prefix?: string
  /**
   * Link of current group
   *
   * 当前分组的链接
   */
  link?: string
  /**
   * Children of current group
   *
   * 当前分组的子项
   */
  children: T[]
}

/**
 * @internal
 */
export type INavbarLinkOptions = IAutoLinkOptions

/**
 * @internal
 */
export type INavbarGroupOptions = INavGroup<INavbarLinkOptions | INavGroup<INavbarLinkOptions> | string>

/**
 * @internal
 */
export type INavbarOptions = (INavbarLinkOptions | INavbarGroupOptions | string)[]

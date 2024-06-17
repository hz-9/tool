/**
 * @internal
 */
interface INavItemOptions {
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
 */
interface IAutoLinkOptions extends INavItemOptions {
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

/**
 * @internal
 */
type ISidebarLinkOptions = IAutoLinkOptions

/**
 * @internal
 */
interface ISidebarGroupOptions extends INavItemOptions {
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
   * Whether current group is expanded by default
   *
   * 当前分组的链接是否默认展开
   *
   * Default: false
   */
  expanded?: boolean
  /**
   * Whether current group is collapsible
   *
   * 当前分组的链接是否可折叠
   *
   * Default: false
   */
  collapsible?: boolean
  /**
   * Children of current group
   *
   * 当前分组的子项
   */
  children: ISidebarItemOptions[]
}

/**
 * @internal
 */
interface ISidebarStructureOptions extends INavItemOptions {
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
   * Whether current group is expanded by default
   *
   * 当前分组的链接是否默认展开
   *
   * Default: false
   */
  expanded?: boolean
  /**
   * Whether current group is collapsible
   *
   * 当前分组的链接是否可折叠
   *
   * Default: false
   */
  collapsible?: boolean
  children: 'structure'
}

/**
 * @internal
 */
type ISidebarItemOptions = ISidebarLinkOptions | ISidebarGroupOptions | ISidebarStructureOptions | string

/**
 * @internal
 */
type ISidebarLinkItem = ISidebarLinkOptions

/**
 * @internal
 */
interface ISidebarGroupItem extends ISidebarGroupOptions {
  prefix: string
  children: ISidebarItem[]
}

/**
 * @internal
 */
export type ISidebarItem = ISidebarLinkItem | ISidebarGroupItem | ISidebarItemOptions

/**
 * @internal
 */
export type ISidebarArrayOptions = ISidebarItemOptions[]

/**
 * @internal
 */
export type ISidebarObjectOptions = Record<string, ISidebarArrayOptions | 'structure' | false>

/**
 * @internal
 */
export type ISidebarOptions = ISidebarArrayOptions | ISidebarObjectOptions | 'structure' | false

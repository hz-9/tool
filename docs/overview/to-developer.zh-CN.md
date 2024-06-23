# 致开发者

`@hz-9/*` 系列包期望开发者的关注及使用，无论是查看源码还是在项目中使用。我们欢迎开发者提供反馈，以帮助使 `@hz-9/*` 系列变得更好。

[Github issues](https://github.com/hz-9/tool/issues)

在中国大陆，Gitee 中，存在了一份 `tool` 的同步版本，开发者也可以在此处提供反馈。

[Gitee issues](https://gitee.com/hz-9/tool/issues)

## Node 版本

`Node.js 16` 已进入 `EOL (生命周期结束)` 周期，不再维护。

当前，`@hz-9/*` 系列包所有开发工作都在使用 `Node.js 18` 进行，我们预计到 `2025` 年将转移到 `Node.js 20` 进行开发。
然而，您仍然可以强制它在 `Node.js 16` 环境中工作，开发者仍将修复可能出现的任何 `BUG`。

## 包版本

对于包版本，当前的 `@hz-9` 系列仓库有两个固定的依赖版本标准：

- `typescript` 使用版本 `5.3.3`。
- `@rushstack/heft` 使用版本 `0.66.1`。

为了确保在 `pnpm` 安装过程中不出现多个版本的 `typescript`，其他包的选择也受到了影响。

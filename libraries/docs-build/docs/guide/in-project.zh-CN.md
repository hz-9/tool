# 在项目中

`@hz-9/docs-build` 可以作为命令行工具使用，如 [README](./) 中所述，也可以直接集成到项目中。

## 安装

```bash
npm install @hz-9/docs-build
# 或者
pnpm install @hz-9/docs-build
# 或者
rush add -p @hz-9/docs-build
```

## 使用

您可以直接调用 `@hz-9/docs-build`，类似于使用 `docs-build` 命令行。

```ts
import { Commander, MultiDocsBuild, SingleDocsBuild } from '@hz-9/docs-build'

;(async () => {
  const options = await Commander.parse()

  if (Commander.inRush(options)) {
    await MultiDocsBuild.build(options)
  } else {
    await SingleDocsBuild.build(options)
  }
})()
```

或者：

```ts
import { type ICommandOptions, Commander, MultiDocsBuild, SingleDocsBuild } from '@hz-9/docs-build'

;(async () => {
  const options: ICommandOptions = {
    // ...
  }

  if (Commander.inRush(options)) {
    await MultiDocsBuild.build(options)
  } else {
    await SingleDocsBuild.build(options)
  }
})()
```

`Commander` 类处理命令行参数。`SingleDocsBuild` 和 `MultiDocsBuild` 分别负责构建常规仓库和 `Rush.js` 仓库的文档网站。

在 `@hz-9/docs-build` 中，我们尽量使用 `protected` 函数，以确保未来的 `extends` 开发更加方便。

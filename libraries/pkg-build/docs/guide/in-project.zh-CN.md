# 在项目中

`@hz-9/pkg-build` 可以作为命令行工具使用，如 [README](./) 中所述，也可以直接集成到项目中。

## 安装

```bash
npm install @hz-9/pkg-build
# 或者
pnpm install @hz-9/pkg-build
# 或者
rush add -p @hz-9/pkg-build
```

## 使用

您可以直接调用 `@hz-9/pkg-build`，类似于使用 `pkg-build` 命令行。

```ts
import { Commander, PkgBuild } from '@hz-9/pkg-build'

;(async () => {
  const options = await Commander.parse()

  await PkgBuild.build(options)
})()
```

或者：

```ts
import { PkgBuild, type IPkgBuildOptions } from '@hz-9/pkg-build'

;(async () => {
  const options: IPkgBuildOptions = {
    // ...
  }

  await PkgBuild.build(options)
})()
```

`Commander` 类处理命令行参数，而 `PkgBuild` 类负责调用 `pkg` 执行构建过程和执行后续操作。

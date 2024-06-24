# @hz-9/pkg-build

一个用于运行 [pkg] 打包 Node.js 服务或工具的工具。

[pkg]: https://www.npmjs.com/package/pkg

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url] ![类型][types-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[npm-version-url]:   https://badgen.net/npm/v/@hz-9/pkg-build
[npm-license-url]:   https://badgen.net/npm/license/@hz-9/pkg-build
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/pkg-build
[types-url]: https://badgen.net/npm/types/@hz-9/pkg-build
[node-version-url]: https://badgen.net/npm/node/@hz-9/pkg-build
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/tool

## 简介

__为什么创建 `@hz-9/pkg-build` 而不直接使用 `pkg`？__

`@hz-9/pkg-build` 仍然利用 pkg 进行打包操作，但没有进行优化。`@hz-9/pkg-build` 提供以下功能：

1. 支持 `buildName` 和 `buildVersion` 参数。默认情况下，它们将从 package.json 文件中读取。
2. 输出的构建产物将以 `${name}-${version}-${platform}-${arch}` 的格式进行重命名。

## 安装

``` bash
npm install --global @hz-9/pkg-build
```

## 使用方法

获取帮助：

``` bash
pkg-build --help
```

最简执行：

``` bash
pkg-build
```

使用配置文件：

``` bash
pkg-build --config ./.hz-9.conf.json
```

请参阅 [配置文件说明](#config-file) 以了解如何编写 `.hz-9.conf.json`。

## 参数

### -r, --root

执行路径，默认为 `process.cwd()`。该参数会影响到 `package.json` 文件的读取和其他相对路径的解析。

### -c, --config

配置文件的路径。如果省略，将不会读取配置文件。

> 命令行参数的优先级高于配置文件参数。

### --build-name

构建输出文件名的名称部分。如果省略，将从 `package.json` 中读取 `name` 参数。如果找不到或解析错误，将默认为 'unknown'。

### --build-version

构建输出文件名的版本部分。如果省略，将从 `package.json` 中读取 `version` 参数。如果找不到或解析错误，将默认为 '0.0.0'。

### --targets

执行 `pkg` 时的 `targets` 参数。详见 [详情](https://www.npmjs.com/package/pkg#targets)。

如果导出多个平台，使用逗号分隔它们（例如：`linux-64,win-x64`）。如果省略，将使用 `linux-x64`。

### --input-path

执行 `pkg` 时的入口文件路径。如果省略，将使用 `./src/index.js`。

### --output-path

执行 `pkg` 时的输出文件夹路径。如果省略，将使用 `./build`。

> --config、--input-path 和 --output-path 参数都可以接受相对路径或绝对路径。
> 相对路径将使用 root 参数作为基路径进行解析。

## 配置文件

配置文件支持 `jsonc` 格式。所有参数都以 `pkg` 为前缀。

例如：读取 `buildName` 参数，将从配置文件中的 `pkg.buildName` 的值读取。

以下是配置文件的模板：

``` json
{
  "pkg": {
    "inputPath": "dist/main.js",
    "buildName": "service",
    "version": "0.0.0",
    "targets": [
      "linux-x64"
    ]
  }
}

```

### pkg.buildName

等同于 `--build-name`。优先级低于命令行参数。

### pkg.buildVersion

等同于 `--build-version`。优先级低于命令行参数。

### pkg.targets

等同于 `--targets`。优先级低于命令行参数。

### pkg.inputPath

等同于 `--input-path`。如果提供了相对路径，将使用配置文件所在路径作为基路径进行解析。

### pkg.outputPath

等同于 `--output-path`。如果提供了相对路径，将使用配置文件所在路径作为基路径进行解析。

### pkg.scripts

由于 `scripts` 是项目中的固定信息，我们不打算在命令行中支持 `scripts` 参数。

[scripts 详情](https://www.npmjs.com/package/pkg#assets)

### pkg.assets

由于 `assets` 是项目中的固定信息，我们不打算在命令行中支持 `assets` 参数。

[assets 详情](https://www.npmjs.com/package/pkg#assets)

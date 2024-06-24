# @hz-9/docs-build

一个用于从 TypeScript 项目生成 [vuepress-theme-hopo] 的工具。

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url] ![类型][types-url]
<br /> ![Node 版本][node-version-url] ![最后提交][last-commit-url]

[vuepress-theme-hopo]: https://theme-hope.vuejs.press/
[npm-version-url]: https://badgen.net/npm/v/@hz-9/docs-build
[npm-license-url]: https://badgen.net/npm/license/@hz-9/docs-build
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/docs-build
[types-url]: https://badgen.net/npm/types/@hz-9/docs-build
[node-version-url]: https://badgen.net/npm/node/@hz-9/docs-build
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/tool

## 简介

`@hz-9/docs-build` 将根据特定规则扫描项目的 markdown 文件，并将其编译成 [vuepress-theme-hopo] 网站。有关逻辑，请参阅[扫描规则](./scan-rule)。

## 安装

``` bash
npm install --global @hz-9/docs-build
```

## 使用方法

获取帮助：

``` bash
docs-build --help
```

最小执行：

``` bash
docs-build
```

开发者模式：

``` bash
docs-build --action serve
```

> `serve` 仅监听文件内容的更改。如果添加了符合规则的文件，则需要重新启动当前命令。

生产环境：

``` bash
docs-build --action build
```

## 参数

### -r, --root

执行路径，默认为 `process.cwd()`。此参数将影响对 `package.json` 文件的读取和其他相对路径的解析。

### -c, --config

`api-extractor.json` 的路径。支持绝对路径或相对路径。

### --docs-space

docs 网站的空间。如果省略，则为 `./docs/.vuepress`。

### --markdown-path

使用 `@microsoft/api-documenter` 生成的 markdown 文件夹。如果省略，则为 `./docs/.markdowns`。

### -a, --action

Vuepress 操作。支持 `serve` 或 `build`。

### --base-url

Vuepress 基本 URL。如果省略，则为 `/`。

### --lang

`Vuepress` 采取的语言。当前仅支持 `en-US` `zh-CN` 两种语言。若需要多种语言时，可使用 `--lang en-US,zh-CN` 方式传入参数。

参数顺序尤为重要，若传入 `en-US,zh-CN` 则默认语言为 `en-US` 会优先按照匹配规则进行匹配文件。而 `zh-CN` 的文件会优先采用 `*.zh-CN.md` 文件，若翻译文件不全，则采用默认语言。

# @hz-9/docs-build

A toos for generate [vuepress-theme-hopo] from typescript project.

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url] ![Types][types-url]
<br /> ![Node Version][node-version-url] ![Last Commit][last-commit-url]

[vuepress-theme-hopo]: https://theme-hope.vuejs.press/
[npm-version-url]: https://badgen.net/npm/v/@hz-9/docs-build
[npm-license-url]: https://badgen.net/npm/license/@hz-9/docs-build
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/docs-build
[types-url]: https://badgen.net/npm/types/@hz-9/docs-build
[node-version-url]: https://badgen.net/npm/node/@hz-9/docs-build
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/tool

## Introduction

`@hz-9/docs-build` will scan the markdown files of a project based on certain rules and compile them into a [vuepress-theme-hopo] website. For logic, please refer to the [Scan Rule](./scan-rule).

## Installation

``` bash
npm install --global @hz-9/docs-build
```

## Usage

Get help:

``` bash
docs-build --help
```

Minimal execution:

``` bash
docs-build
```

Developer mode:

``` bash
docs-build --action serve
```

> `serve` only listens for changes in file content. If a file that matches the rules is added, the current command needs to be restarted.

Production Env:

``` bash
docs-build --action build
```

## Parameters

### -r, --root

The execution path, default is `process.cwd()`. This parameter will affects the reading of the `package.json` file and the resolution of other relative paths.

### -c, --config

The path to `api-extractor.json`. Support absolute path or relative path.

### --docs-space

The space to docs website. If omitted, it is `./docs/.vuepress`.

### --markdown-path

The markdown folder generated using `@microsoft/api-documenter`. If omitted, it is `./docs/.markdowns`.

### -a, --action

Vuepress Action. Support `serve` or `build`.

### --base-url

Vuepress base url. If omitted, it is `/`.

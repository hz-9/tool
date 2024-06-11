# @hz-9/docs-build

A toos for generate [vuepress-theme-hopo] from typescript project.

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url]

[vuepress-theme-hopo]: https://theme-hope.vuejs.press/
[npm-version-url]: https://img.shields.io/npm/v/@hz-9/docs-build
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/docs-build
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/docs-build

## Introduction

`@hz-9/docs-build` will scan the markdown files of a project based on certain rules and compile them into a [vuepress-theme-hopo] website. For logic, please refer to the [Scan Rule](#scan-rule).

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

## Scan rule

### Normal project

| Force file                          | Moved file                             | view link    |
| ----------------------------------- | -------------------------------------- | ------------ |
| `${workspace}/docs/README.md`       | With down line.                        |              |
| `${workspace}/README.md`            | `${docsSpace}/src/README.md`           | `/`          |
| `${workspace}/docs/CHANGELOG.md`    | With down line.                        |              |
| `${workspace}/CHANGELOG.md`         | `${docsSpace}/src/changelog/README.md` | `/changelog` |
| `${workspace}/docs/TODOLIST.md`     | With down line.                        |              |
| `${workspace}/TODOLIST.md`          | `${docsSpace}/src/todo/README.md`      | `/todo`      |
| `${workspace}/docs/guide/*.md`      | `${docsSpace}/src/guide/*.md`          | `/guide/*`   |
| `${workspace}/docs/advance/*.md`    | `${docsSpace}/src/advance/*.md`        | `/advance/*` |
| `${workspace}/docs/.markdowns/*.md` | `${docsSpace}/src/api/*.md`            | `/api/*`     |
| `${workspace}/docs/ABOUT.md`        | `${docsSpace}/src/about/README.md`     | `/about`     |

### Rush.js project

| Force file                                           | Moved file                                             | view link                           |
| ---------------------------------------------------- | ------------------------------------------------------ | ----------------------------------- |
| `${workspace}/docs/README.md`                        | With down line.                                        |                                     |
| `${workspace}/README.md`                             | `${docsSpace}/src/README.md`                           | `/`                                 |
| `${workspace}/${projectFolder}/docs/README.md`       | With down line.                                        |                                     |
| `${workspace}/${projectFolder}/README.md`            | `${docsSpace}/src/home/${unscopedPackageName}.md`      | `/home/${unscopedPackageName}`      |
| `${workspace}/${projectFolder}/docs/CHANGELOG.md`    | With down line.                                        |                                     |
| `${workspace}/${projectFolder}/CHANGELOG.md`         | `${docsSpace}/src/changelog/${unscopedPackageName}.md` | `/changelog/${unscopedPackageName}` |
| `${workspace}/${projectFolder}/docs/TODOLIST.md`     | With down line.                                        |                                     |
| `${workspace}/${projectFolder}/TODOLIST.md`          | `${docsSpace}/src/todo/${unscopedPackageName}.md`      | `/todo/${unscopedPackageName}`      |
| `${workspace}/${projectFolder}/docs/guide/*.md`      | `${docsSpace}/src/guide/${unscopedPackageName}/*.md`   | `/guide/${unscopedPackageName}/*`   |
| `${workspace}/${projectFolder}/docs/advance/*.md`    | `${docsSpace}/src/advance/${unscopedPackageName}/*.md` | `/advance/${unscopedPackageName}/*` |
| `${workspace}/${projectFolder}/docs/.markdowns/*.md` | `${docsSpace}/src/api/${unscopedPackageName}/*.md`     | `/api/${unscopedPackageName}/*`     |
| `${workspace}/${projectFolder}/docs/ABOUT.md`        | `${docsSpace}/src/about/${unscopedPackageName}.md`     | `/about/${unscopedPackageName}`     |

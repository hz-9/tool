# @hz-9/pkg-build

A tool for run [pkg] to package Node.js service or tool.

[pkg]: https://www.npmjs.com/package/pkg

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url] ![Types][types-url]
<br /> ![Node Version][node-version-url] ![Last Commit][last-commit-url]

[npm-version-url]:   https://badgen.net/npm/v/@hz-9/pkg-build
[npm-license-url]:   https://badgen.net/npm/license/@hz-9/pkg-build
[npm-downloads-url]: https://badgen.net/npm/dt/@hz-9/pkg-build
[types-url]: https://badgen.net/npm/types/@hz-9/pkg-build
[node-version-url]: https://badgen.net/npm/node/@hz-9/pkg-build
[last-commit-url]: https://badgen.net/github/last-commit/hz-9/tool

[Document](https://hz-9.github.io/tool/guide/pkg-build/) | [文档](https://hz-9.github.io/tool/zh-CN/guide/pkg-build/)

## Introduction

__Why create `@hz-9/pkg-build` instead of directly use `pkg` ?__

`@hz-9/pkg-build` still utilizes pkg for packaging operations without optimizations. `@hz-9/pkg-build` provides the following functionalities:

1. Supports `buildName` and `buildVersion` parameters. Default, it will read them from the package.json file.
2. The output artifacts will be rename `${name}-${version}-${platform}-${arch}` format.

## Installation

``` bash
npm install --global @hz-9/pkg-build
```

## Usage

Get help:

``` bash
pkg-build --help
```

Minimal execution:

``` bash
pkg-build
```

With config file:

``` bash
pkg-build --config ./.hz-9.conf.json
```

Please see [config file description](#config-file) to learn how to write `.hz-9.conf.json`.

## Parameters

### -r, --root

The execution path, default is `process.cwd()`. This parameter will affects the reading of the `package.json` file and the resolution of other relative paths.

### -c, --config

The path to the configuration file. If omitted, the configuration file is not read.

> The command-line parameters have higher priority than configuration file parameters.

### --build-name

The name part of the build output filename. If omitted, it will read `name` parameter from `package.json`.  If package.json cannot be found or parsed correctly, it will default to 'unknown'.

### --build-version

The version part of the build output filename. If omitted, it will read `version` parameter from `package.json`.  If package.json cannot be found or parsed correctly, it will default to '0.0.0'.

### --targets

The `targets` parameter when execution `pkg`. This is [detail](https://www.npmjs.com/package/pkg#targets).

If export multi platforms, use `,` to separate them.(eg: `linux-64,win-x64`) If omitted, it is `linux-x64`.

### --input-path

The entry file path when execution `pkg`. If ommited, it is `./src/index.js`.

### --output-path

The output folder path when execution `pkg`. If ommited, it is `./build`.

> The --config, --input-path, and --output-path parameters can all accept relative or absolute paths.
> Relative paths will be resolved using the root parameter as the base path.

## Config file

The configuration file support `jsonc` format. All parameters are prefixed with `pkg`.

eg: Read `buildName` parameter, will read the value of `pkg.buildName` from the configuration file.

This is a template for a configuration file:

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

Equivalent to `--build-name`. Has lower priority than command-line arguments.

### pkg.buildVersion

Equivalent to `--build-version`. Has lower priority than command-line arguments.

### pkg.targets

Equivalent to `--targets`. Has lower priority than command-line arguments.

### pkg.inputPath

Equivalent to `--input-path`. If a relative path is provided，it will be resolved using the path where the `config` folder is located as the base path.

### pkg.outputPath

Equivalent to `--output-path`. If a relative path is provided，it will be resolved using the path where the `config` folder is located as the base path.

### pkg.scripts

Since `scripts` are fixed information in the project, we do not plan to support `scripts` parameters in command-line.

[scripts detail](https://www.npmjs.com/package/pkg#assets)

### pkg.assets

Since `assets` are fixed information in the project, we do not plan to support `assets` parameters in command-line.

[assets detail](https://www.npmjs.com/package/pkg#assets)

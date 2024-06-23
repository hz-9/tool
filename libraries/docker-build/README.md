# @hz-9/docker-build

A tool for create node.js docker image and upload artifacts.

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url]

[npm-version-url]: https://img.shields.io/npm/v/@hz-9/docker-build
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/docker-build
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/docker-build

[English Document](https://hz-9.github.io/tool/guide/docker-build/) | [中文文档](https://hz-9.github.io/tool/zh-CN/guide/docker-build/)

## Introduction

`@hz-9/docker-build` provides the following functionalities:

1. Build the docker image;
2. Upload to a third-party source

## Installation

``` bash
npm install --global @hz-9/docker-build
```

## Usage

Get help:

``` bash
docker-build --help
```

Minimal execution:

``` bash
docker-build
```

With config file:

``` bash
docker-build --config ./.hz-9.conf.json
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

### --platform

The `platform` parameter when build docker image. This is [detail](https://docs.docker.com/build/building/multi-platform/).

Now, `@hz-9/docker-build` only support `linux/amd64` and `linux/arm64`.

### --input-path

The entry file path. If ommited, `@hz-9/docker-build` not to do anything.

Now, it should be a separate file.

### --base-image

The base docker image. If omitted, it is `node:${nodeVersion}-slim.`

### --expost-port

The port to expose in docker image. If omitted, docker image will not exposed port.

### --publish

Whether to publish or not. If omitted, it will not publish.
<!-- TODO 补充一个 Nexus 发布私有 Docker Repository 的文档。 -->

### --publish-host

The publish address. Only valid when publishing is required. If omitted, an error will be thrown.

### --last-clean

Final cleanup. After publishing, this command can be used to clean up the build artifacts.

## Config file

The configuration file support `jsonc` format. All parameters are prefixed with `docker`.

eg: Read `buildName` parameter, will read the value of `docker.buildName` from the configuration file.

This is a template for a configuration file:

``` json
{
  "docker": {
    "assets": [
      "./temp/es01.crt",
      "package.json"
    ],
    "inputPath": "./build/service-0.0.0-linux-x64",
    "exposePort": 16100,
  }
}

```

### docker.buildName

Equivalent to `--build-name`. Has lower priority than command-line arguments.

### docker.buildVersion

Equivalent to `--build-version`. Has lower priority than command-line arguments.

### docker.platform

Equivalent to `--platform`. Has lower priority than command-line arguments.

### docker.inputPath

Equivalent to `--input-path`. if a relative path is provided，it will be resolved using the path where the `config` folder is located as the base path.

### docker.baseImage

Equivalent to `--base-image`. Has lower priority than command-line arguments.

### docker.publish

Equivalent to `--publish`. Has lower priority than command-line arguments.

### docker.publishHost

Equivalent to `--publish-host`. Has lower priority than command-line arguments.

### docker.lastClean

Equivalent to `--last-clean`. Has lower priority than command-line arguments.

### docker.assets

The other files where building a docker images. Support absolute path or relative path.
If a relative path is provided，it will be resolved using the path where the `config` folder is located as the base path.

Since `assets` are fixed information in the project, we do not plan to support `assets` parameters in command-line.

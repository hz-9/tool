# @hz-9/docker-build

一个用于创建 Node.js Docker 镜像并上传构件的工具。

![NPM 版本][npm-version-url] ![NPM 许可证][npm-license-url] ![NPM 下载量][npm-downloads-url]

[npm-version-url]: https://img.shields.io/npm/v/@hz-9/docker-build
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/docker-build
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/docker-build

## 简介

`@hz-9/docker-build` 提供以下功能：

1. 构建 Docker 镜像；
2. 上传到第三方源

## 安装

``` bash
npm install --global @hz-9/docker-build
```

## 使用

获取帮助：

``` bash
docker-build --help
```

最简执行：

``` bash
docker-build
```

使用配置文件：

``` bash
docker-build --config ./.hz-9.conf.json
```

请参阅[配置文件说明](#配置文件)以了解如何编写 `.hz-9.conf.json`。

## 参数

### -r, --root

执行路径，默认为 `process.cwd()`。该参数会影响 `package.json` 文件的读取和其他相对路径的解析。

### -c, --config

配置文件的路径。如果省略，将不会读取配置文件。

> 命令行参数的优先级高于配置文件参数。

### --build-name

构建输出文件名的名称部分。如果省略，将从 `package.json` 的 `name` 参数中读取。如果找不到或解析错误，将默认为 'unknown'。

### --build-version

构建输出文件名的版本部分。如果省略，将从 `package.json` 的 `version` 参数中读取。如果找不到或解析错误，将默认为 '0.0.0'。

### --platform

构建 Docker 镜像时的 `platform` 参数。详情请参阅[此处](https://docs.docker.com/build/building/multi-platform/)。

目前，`@hz-9/docker-build` 仅支持 `linux/amd64` 和 `linux/arm64`。

### --input-path

入口文件路径。如果省略，`@hz-9/docker-build` 将不执行任何操作。

现在，它应该是一个单独的文件。

### --base-image

基础 Docker 镜像。如果省略，将使用 `node:${nodeVersion}-slim`。

### --expost-port

在 Docker 镜像中要暴露的端口。如果省略，Docker 镜像将不会暴露端口。

### --publish

是否发布。如果省略，将不会发布。
<!-- TODO 补充一个 Nexus 发布私有 Docker Repository 的文档。 -->

### --publish-host

发布地址。仅在需要发布时有效。如果省略，将抛出错误。

### --last-clean

最终清理。在发布后，可以使用此命令清理构建构件。

## 配置文件

配置文件支持 `jsonc` 格式。所有参数都以 `docker` 为前缀。

例如：读取 `buildName` 参数，将从配置文件中的 `docker.buildName` 值读取。

以下是配置文件的模板：

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

等同于 `--build-name`。优先级低于命令行参数。

### docker.buildVersion

等同于 `--build-version`。优先级低于命令行参数。

### docker.platform

等同于 `--platform`。优先级低于命令行参数。

### docker.inputPath

等同于 `--input-path`。如果提供了相对路径，将使用 `config` 文件夹所在路径作为基路径进行解析。

### docker.baseImage

等同于 `--base-image`。优先级低于命令行参数。

### docker.publish

等同于 `--publish`。优先级低于命令行参数。

### docker.publishHost

等同于 `--publish-host`。优先级低于命令行参数。

### docker.lastClean

等同于 `--last-clean`。优先级低于命令行参数。

### docker.assets

构建 Docker 镜像的其他文件。支持绝对路径或相对路径。
如果提供了相对路径，将使用 `config` 文件夹所在路径作为基路径进行解析。

由于 `assets` 是项目中的固定信息，我们不打算在命令行中支持 `assets` 参数。

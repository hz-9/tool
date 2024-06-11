# TS Docs Build

## 介绍

对 TypeScript 库，`@hz9/ts-docs-build` 会读取 `Markdown` 文件组织成文档网站。

## 扫描方案

在 `ts-docs-build` 读取 `Markdown` 文件时，会经历以下过程：

1. 依次尝试读取 `${workspace}/docs/README.md`、`${workspace}/README.md` 作为文档网站首页，若均不存在，则提供默认文档首页；
2. 依次尝试获取 `${workspace}/docs/CHANGELOG.md` `${workspace}/CHANGELOG.md` 文件，作为 `更新日志` 内容；
3. 依次尝试获取 `${workspace}/docs/TODOLIST.md`、`${workspace}/docs/TODOLIST.todo`、`${workspace}/TODOLIST.md`、`${workspace}/TODOLIST.todo` 文件，作为 `待办清单` 内容；
4. 尝试获取 `${workspace}/docs/guide` 文件夹，将其作为 `指南` 导航；
5. 尝试获取 `${workspace}/docs/advance` 文件夹，将其作为 `进阶` 导航；
6. 尝试获取 `${workspace}/docs/ABOUT.md` 文件，将其作为 `关于` 导航；
7. 尝试获取 `${workspace}/docs/LINKS.json`、`${workspace}/docs/LINK.json` 文件，将其作为 `更多` 导航；
8. 尝试生成 api 的文档，将其作为 `api` 导航（[api 生成方案](#api-生成方案)）；

## api 生成方案

api 生成是基于 [@microsoft/api-extractor](https://api-extractor.com/) 进行 api 文档生成的。`ts-docs-build` 提供了两种方案进行生成：

### 方案1

此方案无需在项目中安装其他依赖，侵入性小，不过要求在全局进行一些依赖的安装。

1. 在 `tsc` 命名打包时，需要保留注释信息；
2. 通过 `@microsoft/api-extractor` 将 `*.d.ts` 合并为一个 `all.d.ts` 文件；
3. 通过 `@microsoft/api-extractor` 生成 `${workspace}/docs/api/index.api.json` `${workspace}/docs/api/index.api.md` 文件；
4. 通过 `@microsoft/api-documenter` 生成独立的 `Markdown` 文件，保存于 `${workspace}/docs/api/.markdowns` 路径下。；
5. 由 `ts-docs-build` 生成文档配置信息；

> 此方案需要在全局安装 `@microsoft/api-extractor` `@microsoft/api-documenter` 组件；

### 方案2

在项目中的打包环节操作中，生成了 `${workspace}/docs/api/index.api.json` 文件；

1. 通过 `@microsoft/api-documenter` 生成独立的 `Markdown` 文件，保存于 `${workspace}/docs/api/.markdowns` 路径下。；
2. 由 `ts-docs-build` 生成文档配置信息；

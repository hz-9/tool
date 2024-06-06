# PKG Build

`@hz9/pkg-build` 是一个 `pkg` 打包的封装库。

`@hz9/pkg-build` 与 `pkg` 相比，增加了以下功能。

1. 对 config 文件，支持更多的属性；
   1. 增加了 `inputPath` 属性，设置打包入库；
   2. 增加 `name` 属性，设置成果名称；
   3. 增加 `version` 属性，设置成果版本；
2. 支持从 package.json 中读取成果名称和版本信息信息；
3. 对于 `MacOS`，`macos` 会优先理解为 `macos-x64` 而非本地环境；
4. 除 `pkg-fetch` 之外，提供了其他的下载能力；

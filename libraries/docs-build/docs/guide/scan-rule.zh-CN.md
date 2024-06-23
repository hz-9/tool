
# 扫描规则

这里说明了 `@hz-9/docs-build` 会扫描哪些哪些路径，从而生成为文档。

`扫描文件` 列中，存在多个文件时，以从上到下的顺序匹配。

`${baseUrl}` 相当于 `--base-url` 参数。默认为 `/`，应传入 `/tool/` 格式的参数。

`${workspace}` 相当于 `process.cwd()` 或 `--root` 参数。

`${docsSpace}` 通常为 `${workspace}/docs/.vuepress` 路径，为自动创建文件夹，添加至 `.gitignore` 中。

`${projectFolder}` 为在 `Rush.js` 项目中的相对路径。

`${unscopedPackageName}` 视为不包括 `scope` 的包名称。

## 普通项目

<table>
  <tr>
    <th>访问地址</th>
    <th>扫描文件</th>
    <th>移动后路径</th>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}</code>
    </td>
    <td>
      <code>${workspace}/docs/README.md</code>
      <br />
      <code>${workspace}/README.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN</code>
    </td>
    <td>
      <code>${workspace}/docs/README.zh-CN.md</code>
      <br />
      <code>${workspace}/README.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/README.md</code>
      <br />
      <code>${workspace}/README.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}overview</code>
    </td>
    <td>
      <code>${workspace}/docs/overview/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/overview/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/overview</code>
    </td>
    <td>
      <code>${workspace}/docs/overview/*.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/overview/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/overview/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}guide</code>
    </td>
    <td>
      <code>${workspace}/docs/guide/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/guide/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/guide</code>
    </td>
    <td>
      <code>${workspace}/docs/guide/*.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/guide/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/guide/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}advance</code>
    </td>
    <td>
      <code>${workspace}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/advance/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/advance</code>
    </td>
    <td>
      <code>${workspace}/docs/advance/*.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/advance/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}api</code>
    </td>
    <td>
      默认 <code>${workspace}/docs/.markdowns/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/api/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/api</code>
    </td>
    <td>
      默认 <code>${workspace}/docs/.markdowns/*.zh-CN.md</code>
      <br />
      默认 <code>${workspace}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/api/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}changelog</code>
    </td>
    <td>
      <code>${workspace}/docs/CHANGELOG.md</code>
      <br />
      <code>${workspace}/CHANGELOG.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/changelog/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/changelog</code>
    </td>
    <td>
      <code>${workspace}/docs/CHANGELOG.zh-CN.md</code>
      <br />
      <code>${workspace}/CHANGELOG.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/CHANGELOG.md</code>
      <br />
      <code>${workspace}/CHANGELOG.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/changelog/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}todo</code>
    </td>
    <td>
      <code>${workspace}/docs/TODOLIST.md</code>
      <br />
      <code>${workspace}/TODOLIST.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/todo/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/todo</code>
    </td>
    <td>
      <code>${workspace}/docs/TODOLIST.zh-CN.md</code>
      <br />
      <code>${workspace}/TODOLIST.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/TODOLIST.md</code>
      <br />
      <code>${workspace}/TODOLIST.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/todo/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}about</code>
    </td>
    <td>
      <code>${workspace}/docs/ABOUT.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/about/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/about</code>
    </td>
    <td>
      <code>${workspace}/docs/ABOUT.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/ABOUT.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/about/README.md</code>
    </td>
  </tr>
</table>

## Rush.js 项目

<table>
  <tr>
    <th>访问地址</th>
    <th>扫描文件</th>
    <th>移动后路径</th>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}</code>
    </td>
    <td>
      <code>${workspace}/docs/README.md</code>
      <br />
      <code>${workspace}/README.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN</code>
    </td>
    <td>
      <code>${workspace}/docs/README.zh-CN.md</code>
      <br />
      <code>${workspace}/README.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/README.md</code>
      <br />
      <code>${workspace}/README.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}overview</code>
    </td>
    <td>
      <code>${workspace}/docs/overview/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/overview/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/overview</code>
    </td>
    <td>
      <code>${workspace}/docs/overview/*.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/overview/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/overview/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}guide/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/guide/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/guide/${unscopedPackageName}/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/guide/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/guide/*.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/docs/guide/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/guide/${unscopedPackageName}/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}advance/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/advance/${unscopedPackageName}/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/advance/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/advance/*.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/advance/${unscopedPackageName}/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}api/${unscopedPackageName}</code>
    </td>
    <td>
      默认 <code>${workspace}/${projectFolder}/docs/.markdowns/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/api/${unscopedPackageName}/*.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/api/${unscopedPackageName}</code>
    </td>
    <td>
      默认 <code>${workspace}/${projectFolder}/docs/.markdowns/*.zh-CN.md</code>
      <br />
      默认 <code>${workspace}/${projectFolder}/docs/advance/*.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/api/${unscopedPackageName}/*.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}changelog/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/CHANGELOG.md</code>
      <br />
      <code>${workspace}/${projectFolder}/CHANGELOG.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/changelog/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/changelog/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/CHANGELOG.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/CHANGELOG.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/docs/CHANGELOG.md</code>
      <br />
      <code>${workspace}/${projectFolder}/CHANGELOG.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/changelog/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}todo/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/TODOLIST.md</code>
      <br />
      <code>${workspace}/${projectFolder}/TODOLIST.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/todo/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/todo/${unscopedPackageName}</code>
    </td>
    <td>
      <code>${workspace}/${projectFolder}/docs/TODOLIST.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/TODOLIST.zh-CN.md</code>
      <br />
      <code>${workspace}/${projectFolder}/docs/TODOLIST.md</code>
      <br />
      <code>${workspace}/${projectFolder}/TODOLIST.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/todo/README.md</code>
    </td>
  </tr>

  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}about</code>
    </td>
    <td>
      <code>${workspace}/docs/ABOUT.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/about/README.md</code>
    </td>
  </tr>
  <tr>
    <td>
      <code>http://127.0.0.1${baseUrl}zh-CN/about</code>
    </td>
    <td>
      <code>${workspace}/docs/ABOUT.zh-CN.md</code>
      <br />
      <code>${workspace}/docs/ABOUT.md</code>
    </td>
    <td>
      <code>${docsSpace}/src/zh-CN/about/README.md</code>
    </td>
  </tr>
</table>

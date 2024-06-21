
# Scan rule

## Normal project

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

## Rush.js project

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

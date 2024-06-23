# In Project

`@hz-9/pkg-build` can be used as a command line tool, as described in the [README](./), or directly integrated into a project.

## Installation

```bash
npm install @hz-9/pkg-build
# or
pnpm install @hz-9/pkg-build
# or
rush add -p @hz-9/pkg-build
```

## Usage

You can directly invoke `@hz-9/pkg-build` similar to using the `pkg-build` command line.

```ts
import { Commander, PkgBuild } from '@hz-9/pkg-build'

;(async () => {
  const options = await Commander.parse()

  await PkgBuild.build(options)
})()
```

Or:

```ts
import { PkgBuild, type IPkgBuildOptions } from '@hz-9/pkg-build'

;(async () => {
  const options: IPkgBuildOptions = {
    // ...
  }

  await PkgBuild.build(options)
})()
```

The `Commander` class handles command line arguments, while the `PkgBuild` class is responsible for invoking `pkg` to perform the build process and executing subsequent operations.

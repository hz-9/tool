# In project

`@hz-9/docs-build` can be used as a command line tool, as described in the [README](./), or directly integrated into a project.

## Installation

```bash
npm install @hz-9/docs-build
# or
pnpm install @hz-9/docs-build
# or
rush add -p @hz-9/docs-build
```

## Usage

You can directly invoke `@hz-9/docs-build` similar to using the `docs-build` command line.

```ts
import { Commander, MultiDocsBuild, SingleDocsBuild } from '@hz-9/docs-build'

;(async () => {
  const options = await Commander.parse()

  if (Commander.inRush(options)) {
    await MultiDocsBuild.build(options)
  } else {
    await SingleDocsBuild.build(options)
  }
})()
```

Or:

```ts
import { type ICommandOptions, Commander, MultiDocsBuild, SingleDocsBuild } from '@hz-9/docs-build'

;(async () => {
  const options: ICommandOptions = {
    // ...
  }

  if (Commander.inRush(options)) {
    await MultiDocsBuild.build(options)
  } else {
    await SingleDocsBuild.build(options)
  }
})()
```

The `Commander` class handles command line arguments. `SingleDocsBuild` and `MultiDocsBuild` are responsible for building documentation websites for regular repositories and `Rush.js` repositories, respectively.

Within `@hz-9/docs-build`, we strive to use `protected` functions as much as possible to ensure ease of `extends` development in the future.

# As Part of a Project

`@hz-9/docker-build` can be used as a command line tool, as described in the [README](./), or directly integrated into a project.

## Installation

```bash
npm install @hz-9/docker-build
# or
pnpm install @hz-9/docker-build
# or
rush add -p @hz-9/docker-build
```

## Usage

You can directly invoke `@hz-9/docker-build` similar to using the `docker-build` command line.

```ts
import { Commander, DockerBuild } from '@hz-9/docker-build'

;(async () => {
  const options = await Commander.parse()

  await DockerBuild.build(options)
})()
```

Or, if you prefer to specify the options directly in your code:

```ts
import { DockerBuild, type IDockerBuildOptions } from '@hz-9/docker-build'

;(async () => {
  const options: IDockerBuildOptions = {
    // Specify your options here
  }

  await DockerBuild.build(options)
})()
```

The `Commander` class handles parsing command line arguments, while the `DockerBuild` class is responsible for building Docker images and provides functionality for uploading them. In the second code snippet, you can directly provide an `IDockerBuildOptions` object to the `DockerBuild.build()` method with your desired configuration.

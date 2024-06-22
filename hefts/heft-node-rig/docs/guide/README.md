# @hz-9/heft-node-rig

A rig package for Node.js projects that build using Heft build system. To learn more about rig packages, consult the [@rushstack/rig-package] documentation.

[@rushstack/rig-package]: https://www.npmjs.com/package/@rushstack/rig-package

![NPM Version][npm-version-url] ![NPM License][npm-license-url] ![NPM Downloads][npm-downloads-url]

[npm-version-url]: https://img.shields.io/npm/v/@hz-9/heft-node-rig
[npm-license-url]: https://img.shields.io/npm/l/@hz-9/heft-node-rig
[npm-downloads-url]: https://img.shields.io/npm/d18m/@hz-9/heft-node-rig

## Introduction

`@hz-9/heft-node-rig` is a [rig](https://heft.rushstack.io/pages/intro/rig_packages/) pacakge. So the project must have used [Heft](https://heft.rushstack.io/).

`@hz-9/heft-node-rig` provides two profiles.

- `default`: A configuration for common, exporting CommonJS (CJS) and ES Module (ESM).
- `tool`: A configuration for command-line tool, exporting CommonJS (CJS) .

## Installation

``` bash
npm install @hz-9/heft-node-rig --save-dev
```

## Usage

1. add file `config/rig.json`:

    ``` js
    // The "rig.json" file directs tools to look for their config files in an external package.
    // Documentation for this system: https://www.npmjs.com/package/@rushstack/rig-package
    {
      "$schema": "https://developer.microsoft.com/json-schemas/rig-package/rig.schema.json",

      /**
       * (Required) The name of the rig package to inherit from.
      * It should be an NPM package name with the "-rig" suffix.
      */
      "rigPackageName": "@hz-9/heft-node-rig",
      /**
       * (Optional) Selects a config profile from the rig package.  The name must consist of
      * lowercase alphanumeric words separated by hyphens, for example "sample-profile".
      * If omitted, then the "default" profile will be used."
      */
      "rigProfile": "tool"
    }

    ```

2. add file `config/jest.config.json`:

    ``` json
    {
      "extends": "@hz-9/heft-node-rig/profiles/tool/config/jest.config.json"
    }

    ```

3. add to `config/tsconfig.json`:

    ``` json
    {
      "extends": "./node_modules/@hz-9/heft-node-rig/profiles/tool/tsconfig.json",
      "compilerOptions": {
        // ...
      }
    }

    ```

4. add to `package.json`:

    ``` json
    {
      "scripts": {
        // ...

        "build": "heft test --clean",
        "test": "heft test --clean",
        "test:watch": "heft test-watch --clean"
      }
    }
    ```

5. now, you can run:

    ``` bash
    npm run build
    ```
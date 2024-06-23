# To Developers

The `@hz-9/*` package series looks forward to the attention and use of developers, whether it's for reviewing the source code or using it in projects. We welcome developers to provide feedback to help make the `@hz-9/*` series better.

[Github issues](https://github.com/hz-9/tool/issues)

In mainland China, there is a synchronized version of `tool` on Gitee, where developers can also provide feedback.

[Gitee issues](https://gitee.com/hz-9/tool/issues)

## Node Version

`Node.js 16` has entered the `EOL (End of Life)` cycle and is no longer maintained.

Currently, all development work for the `@hz-9/*` package series is being done using `Node.js 18`, and we plan to move to `Node.js 20` for development by `2025`.
However, you can still force it to work in a `Node.js 16` environment, and developers will still fix any `BUGs` that may arise.

## Package Versions

For package versions, the current `@hz-9` series repository has two fixed dependency version standards:

- `typescript` is using version `5.3.3`.
- `@rushstack/heft` is using version `0.66.1`.

To ensure that multiple versions of `typescript` do not appear during the `pnpm` installation process, the choice of other packages has also been affected.

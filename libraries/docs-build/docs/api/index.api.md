## API Report File for "@hz-9/docs-build"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { OptionValues } from 'commander';
import type { Package } from 'normalize-package-data';

// @public
export class Commander {
    // (undocumented)
    static inRush(options: ICommandOptions): boolean;
    // (undocumented)
    static parse(): Promise<ICommandOptions>;
    // @internal
    static _parseCommandOptions(options: OptionValues): ICommandOptions;
}

// Warning: (ae-internal-missing-underscore) The name "IApiDocVersionFile" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface IApiDocVersionFile {
    // (undocumented)
    hash: string;
}

// Warning: (ae-internal-missing-underscore) The name "IAutoLinkOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface IAutoLinkOptions extends INavItemOptions {
    activeMatch?: string;
    exact?: boolean;
    link: string;
    rel?: string;
    target?: string;
}

// @public
export interface ICommandOptions {
    action?: VuepressAction;
    baseUrl: string;
    config?: string;
    docsSpace: string;
    // Warning: (ae-incompatible-release-tags) The symbol "lang" is marked as @public, but its signature references "Lang" which is marked as @internal
    lang: Lang[];
    markdownPath: string;
    root: string;
}

// @public
export interface IConfigOptions {
    apiDocVersionFilepath: string;
    apiJsonFilePath: string;
    apiPath: string;
    configPath: string;
    entryPath: string;
    rigPackage?: string;
}

// @public
export interface IDocsItem {
    // (undocumented)
    baseFilepath: string;
    // (undocumented)
    focusFilepath: string;
    // (undocumented)
    isDir: boolean;
    transform?: (s: string) => string;
}

// @public
export interface IDocsParseSchemeItem {
    isDir?: true;
    navName: ILangObj;
    navPath: string;
    parsePath: string[];
    transform?: (s: string) => string;
}

// Warning: (ae-internal-missing-underscore) The name "IGitInfo" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export interface IGitInfo {
    // (undocumented)
    gitUrl?: string;
}

// @public (undocumented)
export interface ILangObj {
    // (undocumented)
    'en-US': string;
    // (undocumented)
    'zh-CN': string;
}

// Warning: (ae-internal-missing-underscore) The name "ILocales" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ILocales = {
    '/': {
        lang: Lang;
    };
} & {
    [K in LangPlus]?: {
        lang: Lang;
    };
};

// Warning: (ae-forgotten-export) The symbol "INavGroup" needs to be exported by the entry point index.d.ts
// Warning: (ae-internal-missing-underscore) The name "INavbarGroupOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type INavbarGroupOptions = INavGroup<INavbarLinkOptions | INavGroup<INavbarLinkOptions> | string>;

// Warning: (ae-internal-missing-underscore) The name "INavbarLinkOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type INavbarLinkOptions = IAutoLinkOptions;

// Warning: (ae-internal-missing-underscore) The name "INavbarOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type INavbarOptions = (INavbarLinkOptions | INavbarGroupOptions | string)[];

// Warning: (ae-internal-missing-underscore) The name "INavbarOptionsGroup" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type INavbarOptionsGroup = {
    '/': INavbarOptions;
} & {
    [K in LangPlus]?: INavbarOptions;
};

// Warning: (ae-internal-missing-underscore) The name "INavItemOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface INavItemOptions {
    ariaLabel?: string;
    icon?: string;
    text: string;
}

// Warning: (ae-internal-missing-underscore) The name "IRenderOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface IRenderOptions {
    // (undocumented)
    gitInfo: IGitInfo;
    // (undocumented)
    locales: ILocales;
    // (undocumented)
    options: ICommandOptions;
    packageInfo: Package;
}

// Warning: (ae-internal-missing-underscore) The name "IRushProject" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface IRushProject {
    // (undocumented)
    packageName: string;
    // (undocumented)
    projectFolder: string;
    // (undocumented)
    shouldPublish?: boolean;
}

// Warning: (ae-forgotten-export) The symbol "ISidebarItemOptions" needs to be exported by the entry point index.d.ts
// Warning: (ae-internal-missing-underscore) The name "ISidebarArrayOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ISidebarArrayOptions = ISidebarItemOptions[];

// Warning: (ae-forgotten-export) The symbol "ISidebarLinkItem" needs to be exported by the entry point index.d.ts
// Warning: (ae-forgotten-export) The symbol "ISidebarGroupItem" needs to be exported by the entry point index.d.ts
// Warning: (ae-internal-missing-underscore) The name "ISidebarItem" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ISidebarItem = ISidebarLinkItem | ISidebarGroupItem | ISidebarItemOptions;

// Warning: (ae-internal-missing-underscore) The name "ISidebarObjectOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ISidebarObjectOptions = Record<string, ISidebarArrayOptions | 'structure' | false>;

// Warning: (ae-internal-missing-underscore) The name "ISidebarOptions" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ISidebarOptions = ISidebarArrayOptions | ISidebarObjectOptions | 'structure' | false;

// Warning: (ae-internal-missing-underscore) The name "ISidebarOptionsGroup" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type ISidebarOptionsGroup = {
    '/': ISidebarObjectOptions;
} & {
    [K in LangPlus]?: ISidebarObjectOptions;
};

// Warning: (ae-internal-missing-underscore) The name "Lang" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type Lang = keyof ILangObj;

// Warning: (ae-internal-missing-underscore) The name "LangPlus" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal (undocumented)
export type LangPlus = `/${Lang}/`;

// @public
export class MultiDocsBuild extends SingleDocsBuild {
    // (undocumented)
    static build(optionsBase: ICommandOptions): Promise<MultiDocsBuild>;
    // (undocumented)
    build(options: ICommandOptions): Promise<void>;
    // Warning: (ae-incompatible-release-tags) The symbol "readRushProjects" is marked as @public, but its signature references "IRushProject" which is marked as @internal
    //
    // (undocumented)
    protected readRushProjects(options: ICommandOptions): IRushProject[];
}

// @public
export class SingleDocsBuild {
    constructor();
    // (undocumented)
    static build(optionsBase: ICommandOptions): Promise<SingleDocsBuild>;
    // (undocumented)
    build(optionsBase: ICommandOptions): Promise<void>;
    // (undocumented)
    protected docsItemList: IDocsItem[];
    // (undocumented)
    protected generateAPIDocs(options: ICommandOptions, configOptions: IConfigOptions): Promise<void>;
    // (undocumented)
    protected generateSidebarJson(apiDir: string): void;
    // Warning: (ae-incompatible-release-tags) The symbol "getLocales" is marked as @public, but its signature references "ILocales" which is marked as @internal
    //
    // (undocumented)
    protected getLocales(options: ICommandOptions): ILocales;
    // Warning: (ae-incompatible-release-tags) The symbol "getNavName" is marked as @public, but its signature references "Lang" which is marked as @internal
    //
    // (undocumented)
    protected getNavName(navName: ILangObj, lang: Lang): string;
    // (undocumented)
    protected moveAndWatch(options: ICommandOptions): Promise<void>;
    // Warning: (ae-incompatible-release-tags) The symbol "moveVuepressTemp" is marked as @public, but its signature references "IRenderOptions" which is marked as @internal
    //
    // (undocumented)
    protected moveVuepressTemp(vuepressDirPath: string, renderOptions: IRenderOptions): Promise<void>;
    // Warning: (ae-incompatible-release-tags) The symbol "navbarOptionsGroup" is marked as @public, but its signature references "INavbarOptionsGroup" which is marked as @internal
    //
    // (undocumented)
    protected navbarOptionsGroup: INavbarOptionsGroup;
    // (undocumented)
    protected needDeleteDirList: string[];
    // (undocumented)
    protected parseAPIExtractorJson(options: ICommandOptions, tempDir: string): Promise<IConfigOptions>;
    // Warning: (ae-incompatible-release-tags) The symbol "praseSidebarJson" is marked as @public, but its signature references "ISidebarArrayOptions" which is marked as @internal
    //
    // (undocumented)
    protected praseSidebarJson(dirPath: string, lang: keyof ILangObj): ISidebarArrayOptions | undefined;
    // (undocumented)
    protected runApiDocumenter(options: ICommandOptions, configOptions: IConfigOptions): Promise<void>;
    // (undocumented)
    protected runApiExtractor(options: ICommandOptions, configOptions: IConfigOptions): Promise<void>;
    // Warning: (ae-forgotten-export) The symbol "DocsParseScheme" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    protected scan(options: ICommandOptions, docsParseScheme?: Partial<typeof DocsParseScheme>, inRush?: boolean): Promise<IDocsItem[]>;
    // Warning: (ae-incompatible-release-tags) The symbol "sidebarOptionsGroup" is marked as @public, but its signature references "ISidebarOptionsGroup" which is marked as @internal
    //
    // (undocumented)
    protected sidebarOptionsGroup: ISidebarOptionsGroup;
    // (undocumented)
    protected toAbsolute(options: ICommandOptions): ICommandOptions;
    // (undocumented)
    protected transformFileOrDir(from: string, to: string, transform?: (c: string) => string): void;
    // Warning: (ae-incompatible-release-tags) The symbol "tryGetGitInfo" is marked as @public, but its signature references "IGitInfo" which is marked as @internal
    //
    // (undocumented)
    protected tryGetGitInfo(root: string): Promise<IGitInfo>;
    // (undocumented)
    protected vuepressAction(docsSpace: string, action?: VuepressAction): Promise<void>;
}

// @public
export enum VuepressAction {
    // (undocumented)
    Build = "build",
    // (undocumented)
    Serve = "serve"
}

// (No @packageDocumentation comment for this package)

```

<div align="center">
  <a href="https://github.com/bconnorwhite/fs-safe">
    <img alt="fs-safe" src="assets/header.svg" />
  </a>
  <a href="https://npmjs.com/package/fs-safe">
    <img alt="NPM" src="https://img.shields.io/npm/v/fs-safe.svg">
  </a>
  <a href="https://github.com/bconnorwhite/fs-safe">
    <img alt="TypeScript" src="https://img.shields.io/github/languages/top/bconnorwhite/fs-safe.svg">
  </a>
  <a href="https://coveralls.io/github/bconnorwhite/fs-safe?branch=master">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/bconnorwhite/fs-safe/badge.svg?branch=master" />
  </a>
  <a href="https://github.com/bconnorwhite/fs-safe">
    <img alt="GitHub Stars" src="https://img.shields.io/github/stars/bconnorwhite/fs-safe?label=Stars%20Appreciated%21&style=social">
  </a>
  <a href="https://twitter.com/bconnorwhite">
    <img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/bconnorwhite.svg?label=%40bconnorwhite&style=social">
  </a>
</div>

<br />

> A simple fs wrapper that doesn't throw.

## Philosophy

Throwing is bad. Instead, we should return a value correspondent to the success of an operation.
- Read operations should return the expected value, or `undefined` if unable to read.
- Write operations should return a boolean or `undefined` success value.
  - `true`: Successful or unnecessary (ex: failing to create a directory that already exists)
  - `false`: Unsuccessful
  - `undefined`: Unsuccessful, but the desired state may already exist (ex: failing to create a directory but not knowing if that directory already exists)

## Installation

```sh
yarn add fs-safe
```

```sh
npm install fs-safe
```

## API

### Exists

- [fileExists](#fileexists)
- [dirExists](#direxists)

### Directories

- [readDir](#readdir)
- [writeDir](#writedir)
- [removeDir](#removedir)
- [watchDir](#watchdir)

### Files

- [readFile](#readfile)
- [writeFile](#writefile)
- [removeFile](#removefile)
- [watchFile](#watchfile)
- [makeExecutable](#makeExecutable)

### JSON
- [readJSON](#readjson)
- [writeJSON](#writejson)
- [mergeJSON](#mergejson)

### fileExists

```ts
import { fileExists, fileExistsSync, FileExistsOptions } from "fs-safe";

function fileExists(path: string, options?: FileExistsOptions): Promise<boolean | undefined>;

function fileExistsSync(path: string, options?: FileExistsOptions): boolean | undefined;

type FileExistsOptions = {
    /**
     * Return true if path is directory. Default: `false`
     */
    includeDirectories?: boolean;
};
```

### dirExists

```ts
import { dirExists, dirExistsSync, DirExistsOptions } from "fs-safe";

function dirExists(path: string, options?: DirExistsOptions): Promise<boolean | undefined>;

function dirExistsSync(path: string, options?: DirExistsOptions): boolean | undefined;

type DirExistsOptions = {
    /**
     * Return true if path is file. Default: `false`
     */
    includeFiles?: boolean;
};
```

### readDir

```ts
import { readDir, readDirSync, ReadDirOptions } from "fs-safe";

function readDir(path: string, options: ReadDirOptions): Promise<string[] | undefined>;

function readDirSync(path: string, options: ReadDirOptions): string[] | undefined;

type ReadDirOptions = {
  /**
   * Recursively read child directories as well. Default: `true`
   */
  recursive?: boolean;
    /**
   * Whether to include directories in the results. Default: `false`
   */
  includeDirectories?: boolean;
}
```

### writeDir

```ts
import { writeDir, writeDirSync, WriteDirOptions } from "fs-safe";

function writeDir(path: string, options: WriteDirOptions): Promise<boolean | undefined>;

function writeDirSync(path: string, options: WriteDirOptions): boolean | undefined;

type WriteDirOptions = {
  recursive?: boolean; // Default: true
}
```

### removeDir

```ts
import { removeDir, removeDirSync, RemoveDirOptions } from "fs-safe";

function removeDir(path: string, options: RemoveDirOptions): Promise<boolean | undefined>;

function removeDirSync(path: string, options: RemoveDirOptions): boolean | undefined;

type RemoveDirOptions = {
  /**
   * If true, perform a recursive directory removal. Default: `true`
   */
  recursive?: boolean;
}
```

### watchDir

#### Usage
```ts
import { watchDir } from "fs-safe";

const watcher = watchDir("/path/to/dir");

watcher.onReady(() => {
  console.log(`Ready`);
}).onAdd((path: string) => {
  console.log(`Added ${path}`);
}).onChange((path: string) => {
  console.log(`Changed ${path}`);
}).onRemove((path: string) => {
  console.log(`Removed ${path}`);
}).onAddDir((path: string) => {
  console.log(`Added dir ${path}`);
}).onRemoveDir((path: string) => {
  console.log(`Added dir ${path}`);
});

// To stop watching:
watcher.stop();
```

#### Types
```ts
import { watchDir, DirWatcher, EventCallback } from "fs-safe";

function watchDir(path: string): DirWatcher;

type EventCallback = (path: string) => void;

type DirWatcher = {
  onAdd: (cb: EventCallback) => DirWatcher;
  onRemove: (cb: EventCallback) => DirWatcher;
  onChange: (cb: EventCallback) => DirWatcher;
  onAddDir: (cb: EventCallback) => DirWatcher;
  onRemoveDir: (cb: EventCallback) => DirWatcher;
  onReady: (cb: () => void) => DirWatcher;
  stop: () => Promise<boolean>;
}
```

### readFile

```ts
import { readFile, readFileSync } from "fs-safe";

readFile(path: string) => Promise<string | undefined>;

readFileSync(path: string) => string | undefined;
```

### writeFile

```ts
import { writeFile, writeFileSync, WriteFileOptions } from "fs-safe";

function writeFile(path: string, content?: string | Buffer): Promise<boolean>;

function writeFileSync(path: string, content?: string | Buffer): boolean;

type WriteFileOptions = {
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
  /**
   * Write even if file already exists. Default: `true`
   */
  overwrite?: boolean;
}
```

### removeFile

```ts
import { removeFile, removeFileSync } from "fs-safe";

function removeFile(path: string): Promise<boolean | undefined>;

function removeFileSync(path: string): boolean | undefined;
```

### watchFile

#### Usage
```ts
import { watchFile } from "fs-safe";

const watcher = watchFile("/path/to/file.txt");

watcher.onReady(() => {
  console.log(`Ready`);
}).onAdd((path: string) => {
  console.log(`Added ${path}`);
}).onChange((path: string) => {
  console.log(`Changed ${path}`);
}).onRemove((path: string) => {
  console.log(`Removed ${path}`);
});

// To stop watching:
watcher.stop();
```

#### Types
```ts
import { watchFile, FileWatcher, EventCallback } from "fs-safe";

function watchFile(path: string): FileWatcher;

type EventCallback = (path: string) => void;

type FileWatcher = {
  onAdd: (cb: EventCallback) => FileWatcher;
  onRemove: (cb: EventCallback) => FileWatcher;
  onChange: (cb: EventCallback) => FileWatcher;
  onReady: (cb: () => void) => FileWatcher;
  stop: () => Promise<boolean>;
}
```

### makeExecutable

```ts
import { makeExecutable, makeExecutableSync } from "make-executable";

function makeExecutable(path: string): Promise<boolean | undefined>;

function makeExecutableSync(path: string): boolean | undefined;
```

### readJSON

#### Read a JSONValue:

```ts
import { readJSON, readJSONSync, JSONValue } from "read-json-safe";

function readJSON(path: string): Promise<JSONValue | undefined>;

function readJSONSync(path: string): JSONValue | undefined;

type JSONValue = string | number | boolean | JSONObject | JSONArray | null;
```

#### Read a JSONObject:

```ts
import { readJSONObject, readJSONObjectSync, JSONObject } from "read-json-safe";

function readJSONObject(path: string): Promise<JSONObject| undefined>;

function readJSONObjectSync(path: string): JSONObject| undefined;

type JSONObject = {
    [key: string]: JSONValue;
}
```

#### Read a JSONArray:

```ts
import { readJSONArray, readJSONArraySync, JSONArray } from "read-json-safe";

function readJSONArray(path: string): Promise<JSONArray | undefined>;

function readJSONArraySync(path: string): JSONArray | undefined;

type JSONArray = Array<JSONValue>;
```

### writeJSON

```ts
import { writeJSON, writeJSONSync, Options, JSONObject } from "write-json-safe";

function writeJSON(path: string, content?: JSONObject, options?: Options): Promise<boolean>;

function writeJSONSync(path: string, content?: JSONObject, options?: Options): boolean;

type Options = {
  /**
   * Output formatted JSON. Default: `true`
   */
  pretty?: boolean;
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
  /**
   * Write even if file already exists. Default: `true`
   */
  overwrite?: boolean;
}
```

### mergeJSON

#### Usage

##### For existing files:
```ts
import { mergeJSON } from "fs-safe";

// old-file.json (before):
// {
//  "ok": true
// }
//
mergeJSON("old-file.json", { test: 1 });

// old-file.json (after):
// {
//   "ok": true,
//   "test": 1
// }
//
```

##### For new files:
```ts
import { mergeJSON } from "fs-safe";

mergeJSON("new-file.json", { test: 1 });

// new-file.json:
// {
//   "test": 1
// }
//

```

#### Types
```ts
import { mergeJSON, mergeJSONSync, JSONObject } from "fs-safe";

function mergeJSON(path: string, object: JSONObject, options?: Options): Promise<boolean>;

function mergeJSONSync(path: string, object: JSONObject, options?: Options): boolean;

type Options = {
  /**
   * Output formatted JSON. Default: `true`
   */
  pretty?: boolean;
  /**
   * Recursively create parent directories if needed. Default: `true`
   */
  recursive?: boolean;
  /**
   * Ensure file ends with a newline. Default: `true`
   */
  appendNewline?: boolean;
}
```

<br />

<h2>Dependencies<img align="right" alt="dependencies" src="https://img.shields.io/david/bconnorwhite/fs-safe.svg"></h2>

- [dir-exists-safe](https://www.npmjs.com/package/dir-exists-safe): Check if a directory exists without try catch
- [file-exists-safe](https://www.npmjs.com/package/file-exists-safe): Check if a file exists without try catch
- [make-executable](https://www.npmjs.com/package/make-executable): Set the executable bits on a file
- [merge-json-file](https://www.npmjs.com/package/merge-json-file): Merge a JSON file with a JSON object
- [read-dir-safe](https://www.npmjs.com/package/read-dir-safe): Read directories recursively or non-recursively
- [read-file-safe](https://www.npmjs.com/package/read-file-safe): Read files without try catch
- [read-json-safe](https://www.npmjs.com/package/read-json-safe): Read JSON files without try catch
- [remove-dir-safe](https://www.npmjs.com/package/remove-dir-safe): Remove directories recursively or non-recursively without try catch
- [remove-file-safe](https://www.npmjs.com/package/remove-file-safe): Remove files without try catch
- [watch-dir-safe](https://www.npmjs.com/package/watch-dir-safe): Watch a directory for changes
- [watch-file-safe](https://www.npmjs.com/package/watch-file-safe): Watch a file for changes
- [write-dir-safe](https://www.npmjs.com/package/write-dir-safe): Create directories and their parents recursively without try catch
- [write-file-safe](https://www.npmjs.com/package/write-file-safe): Write files and create parent directories if necessary
- [write-json-safe](https://www.npmjs.com/package/write-json-safe): Write formatted JSON to a file

<br />

<h2>Dev Dependencies<img align="right" alt="David" src="https://img.shields.io/david/dev/bconnorwhite/fs-safe.svg"></h2>

- [@bconnorwhite/bob](https://www.npmjs.com/package/@bconnorwhite/bob): Bob is a toolkit for TypeScript projects

<br />

<h2>License <img align="right" alt="license" src="https://img.shields.io/npm/l/fs-safe.svg"></h2>

[MIT](https://opensource.org/licenses/MIT)

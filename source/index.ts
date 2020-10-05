export { fileExists, fileExistsSync } from "file-exists-safe";
export { dirExists, dirExistsSync } from "dir-exists-safe";

export { writeDir, writeDirSync, Options as WriteDirOptions } from "write-dir-safe";
export { readDir, readDirSync, Options as ReadDirOptions } from "read-dir-safe";
export { removeDir, removeDirSync, Options as RemoveDirOptions } from "remove-dir-safe";
export { default as watchDir, Watcher as DirWatcher, EventCallback } from "watch-dir-safe";

export { writeFile, writeFileSync, Options as WriteFileOptions } from "write-file-safe";
export { readFile, readFileSync, Options as ReadFileOptions } from "read-file-safe";
export { removeFile, removeFileSync } from "remove-file-safe";
export { default as watchFile, Watcher as FileWatcher } from "watch-file-safe";

export {
  readJSON,
  readJSONObject,
  readJSONArray,
  readJSONSync,
  readJSONObjectSync,
  readJSONArraySync,
  JSONObject,
  JSONArray,
  JSONValue
} from "read-json-safe";
export { writeJSON, writeJSONSync } from "write-json-safe";
export { mergeJSON, mergeJSONSync } from "merge-json-file";

export { makeExecutable, makeExecutableSync } from "make-executable";

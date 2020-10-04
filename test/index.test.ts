/* eslint-disable no-sync */
import { test, expect } from "@jest/globals";
import * as fs from "../source";

test("export sanity check", () => {
  expect(typeof fs.fileExists).toBe("function");
  expect(typeof fs.fileExistsSync).toBe("function");
  expect(typeof fs.dirExists).toBe("function");
  expect(typeof fs.dirExistsSync).toBe("function");
  expect(typeof fs.writeDir).toBe("function");
  expect(typeof fs.writeDirSync).toBe("function");
  expect(typeof fs.readDir).toBe("function");
  expect(typeof fs.readDirSync).toBe("function");
  expect(typeof fs.removeDir).toBe("function");
  expect(typeof fs.removeDirSync).toBe("function");
  expect(typeof fs.watchDir).toBe("function");
  expect(typeof fs.writeFile).toBe("function");
  expect(typeof fs.writeFileSync).toBe("function");
  expect(typeof fs.readFile).toBe("function");
  expect(typeof fs.readFileSync).toBe("function");
  expect(typeof fs.removeFile).toBe("function");
  expect(typeof fs.removeFileSync).toBe("function");
  expect(typeof fs.watchFile).toBe("function");
  expect(typeof fs.makeExecutable).toBe("function");
  expect(typeof fs.makeExecutableSync).toBe("function");
  expect(typeof fs.readJSON).toBe("function");
  expect(typeof fs.readJSONObject).toBe("function");
  expect(typeof fs.readJSONArray).toBe("function");
  expect(typeof fs.readJSONSync).toBe("function");
  expect(typeof fs.readJSONObjectSync).toBe("function");
  expect(typeof fs.readJSONArraySync).toBe("function");
});

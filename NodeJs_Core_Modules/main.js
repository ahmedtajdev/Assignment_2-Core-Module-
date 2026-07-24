const path = require("node:path");
const fs = require("node:fs");
const fsPromise = require("node:fs/promises");
const { EventEmitter, on } = require("node:events");
const os = require("node:os");
const zlib = require("node:zlib");
const { pipeline } = require("node:stream");

// 1. Write a function that logs the current file path and directory.
function logCurrentFilePathAndDir() {
  console.log({ File: __filename, Dir: __dirname });
}
logCurrentFilePathAndDir();

/////////////////////////////////////////////

// 2. Write a function that takes a file path and returns its file name.
function getFileName(filePath) {
  return filePath.split(path.sep).at(-1);
}
console.log({ getFileName: getFileName(__filename) });

/////////////////////////////////////////////

// 3. Write a function that builds a path from an object

function buildAPathFromAnObj(pathObj) {
  return path.normalize(path.format(pathObj));
}
console.log({
  buildAPathFromAnObj: buildAPathFromAnObj({
    dir: "/folder",
    name: "app",
    ext: ".js",
  }),
});

/////////////////////////////////////////////

// 4. Write a function that returns the file extension from a given file path.

function getFileExt(filePath) {
  return path.extname(filePath);
}
console.log({ getFileExt: getFileExt("/docs/readme.md") });

/////////////////////////////////////////////

// 5. Write a function that parses a given path and returns its name and ext.

function parsePath(filePath) {
  const { name, ext } = path.parse(filePath);
  return { Name: name, Ext: ext };
}
console.log({ parsePath: parsePath("/home/app/main.js") });

/////////////////////////////////////////////

// 6. Write a function that checks whether a given path is absolute.

function checkIsAbsolute(filePath) {
  return path.isAbsolute(filePath);
}
console.log({ checkIsAbsolute: checkIsAbsolute("/home/user/file.txt") });

/////////////////////////////////////////////

// 7. Write a function that joins multiple segments

function joinPathSegments(...paths) {
  return path.join(...paths);
}
console.log({
  joinPathSegments: joinPathSegments("src", "components", "App.js"),
});

/////////////////////////////////////////////

// 8. Write a function that resolves a relative path to an absolute one.

function resolveRelToAbs(filePath) {
  return path.resolve(filePath);
}
console.log({ resolveRelToAbs: resolveRelToAbs("./index.js") });

/////////////////////////////////////////////

// 9. Write a function that joins two paths.

function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}
console.log({ joinTwoPaths: joinTwoPaths("/folder1", "folder2/file.txt") });

/////////////////////////////////////////////

// 10. Write a function that deletes a file asynchronously.

function deleteFileAsync(filePath) {
  fs.unlink(filePath, (error) => {
    if (error) console.log(error.message);
    else console.log(`${filePath} was deleted`);
  });
}
// deleteFileAsync("./delete.txt");

/////////////////////////////////////////////

// 11. Write a function that creates a folder synchronously.

function createFolderSync(destPath) {
  try {
    fs.mkdirSync(destPath, { recursive: true });
    console.log("Success");
  } catch (error) {
    console.log(error.message);
  }
}
// createFolderSync("users");

/////////////////////////////////////////////

// 12. Create an event emitter that listens for a "start" event and logs a welcome message.

const myEmitter = new EventEmitter();

myEmitter.on("start", () => {
  console.log("Welcome event triggered!");
});

myEmitter.emit("start");

/////////////////////////////////////////////

// 13. Emit a custom "login" event with a username parameter.

myEmitter.on("login", (userName) => {
  console.log(`User logged in: ${userName}`);
});

myEmitter.emit("login", "Ahmed");

/////////////////////////////////////////////

// 14. Read a file synchronously and log its contents.

const testFile = path.resolve("test.txt");
const testFile2 = path.resolve("test2.txt");

try {
  const data = fs.readFileSync(testFile, "utf-8");
  console.log({ data });
} catch (error) {
  console.log(error.message);
}

/////////////////////////////////////////////

// 15. Write asynchronously to a file.

async function writeToFileAsync(filePath) {
  try {
    await fsPromise.writeFile(filePath, `@@@Hello, world!`);
    console.log({ writeToFileAsync: "Done!" });
  } catch (error) {
    console.log(error.message);
  }
}
// writeToFileAsync(testFile);

/////////////////////////////////////////////

// 16. Check if a directory exists.

function isDirExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (error) {
    return error.message;
  }
}
console.log({ isDirExists: isDirExists(testFile) });

/////////////////////////////////////////////

// 17. Write a function that returns the OS platform and CPU architecture.

function getDeviceInfo() {
  return {
    Platform: os.platform(),
    Arc: os.arch(),
  };
}
console.log({ getDeviceInfo: getDeviceInfo() });

/////////////////////////////////////////////

// 18. Use a readable stream to read a file in chunks and log each chunk.

function readFileInChunks(filePath) {
  const readStream = fs.createReadStream(filePath, {
    encoding: "utf-8",
  });
  readStream.on("data", (chunk) => {
    console.log({ chunk });
  });
  readStream.on("error", (error) => {
    console.log(error.message);
  });
  readStream.on("end", () => {
    console.log("Finished reading file.");
  });
}
readFileInChunks(testFile);

/////////////////////////////////////////////

// 19. Use readable and writable streams to copy content from one file to another.

function copyFileUsingStreams(srcPath, destPath) {
  const readStream = fs.createReadStream(srcPath, {
    encoding: "utf-8",
  });
  const writeStream = fs.createWriteStream(destPath, {
    encoding: "utf-8",
  });

  readStream.pipe(writeStream);

  writeStream.on("finish", () => {
    console.log({ copyFileUsingStreams: "File copied successfully!" });
  });

  readStream.on("error", (error) => {
    console.log(error.message);
  });
  writeStream.on("error", (error) => {
    console.log(error.message);
  });
}
copyFileUsingStreams(testFile, testFile2);

/////////////////////////////////////////////

// 20. Create a pipeline that reads a file, compresses it, and writes it to another file.

function compressFileUsingPipeline(srcPath, destPath) {
  const gzip = zlib.createGzip();
  const readStream = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(destPath);

  pipeline(readStream, gzip, writeStream, (error) => {
    if (error) {
      console.log(error.message);
    } else {
      console.log({
        compressFileUsingPipeline: "File compressed successfully!",
      });
    }
  });
}
compressFileUsingPipeline(testFile, path.resolve("test.txt.gz"));

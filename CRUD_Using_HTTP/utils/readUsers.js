const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve("users.json");

function readUsers() {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

module.exports = readUsers;

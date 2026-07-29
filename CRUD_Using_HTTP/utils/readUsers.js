const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.resolve("users.json");

async function readUsers() {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}

module.exports = readUsers;

const fs = require("node:fs/promises");
const path = require("node:path");

const filePath = path.resolve("users.json");

async function writeUsers(users) {
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));
}

module.exports = writeUsers;

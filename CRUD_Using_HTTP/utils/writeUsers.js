const fs = require("node:fs");
const path = require("node:path");

const filePath = path.resolve("users.json");

function writeUsers(users) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}

module.exports = writeUsers;

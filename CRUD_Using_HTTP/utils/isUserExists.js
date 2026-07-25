function isUserExists(users, key, value) {
  return users.some((user) => user[key] === value);
}

module.exports = isUserExists;

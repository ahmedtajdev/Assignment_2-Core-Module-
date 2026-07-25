const {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
} = require("../controllers/userController");

function userRoutes(req, res) {
  if (req.method === "POST" && req.url === "/user") {
    return createUser(req, res);
  }

  if (req.method === "PATCH" && req.url.startsWith("/user/")) {
    return updateUser(req, res);
  }

  if (req.method === "DELETE" && req.url.startsWith("/user/")) {
    return deleteUser(req, res);
  }

  if (req.method === "GET" && req.url === "/user") {
    return getAllUsers(req, res);
  }

  if (req.method === "GET" && req.url.startsWith("/user/")) {
    return getUserById(req, res);
  }
}
module.exports = { userRoutes };

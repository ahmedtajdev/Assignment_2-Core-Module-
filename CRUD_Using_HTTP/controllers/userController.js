const readUsers = require("../utils/readUsers");
const writeUsers = require("../utils/writeUsers");
const parseBody = require("../utils/parseBody");
const isUserExists = require("../utils/isUserExists");
const sendResponse = require("../utils/sendResponse");

async function createUser(req, res) {
  try {
    const newUser = await parseBody(req);
    const users = await readUsers();
    const user = users.find((user) => user.email === newUser.email);

    if (user) {
      return sendResponse(res, 400, {
        message: "Email already exists",
      });
    }

    newUser.id = users.length > 0 ? users.at(-1).id + 1 : 1;

    users.push(newUser);

    await writeUsers(users);

    sendResponse(res, 201, {
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return sendResponse(res, 400, { message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const id = Number(req.url.split("/")[2]);
    const updatedUserData = await parseBody(req);
    const users = await readUsers();
    const userMap = new Map(users.map((user) => [user.id, user]));
    const user = userMap.get(id);

    if (!userMap.has(id)) {
      return sendResponse(res, 404, {
        message: "User ID not found.",
      });
    }

    if (
      updatedUserData.email &&
      users.some(
        (user) => user.email === updatedUserData.email && user.id !== id,
      )
    ) {
      return sendResponse(res, 400, {
        message: "Email already exists.",
      });
    }

    const userIndex = id - 1;

    users[userIndex] = {
      ...users[userIndex],
      ...updatedUserData,
      id,
    };

    await writeUsers(users);

    return sendResponse(res, 200, {
      message: "User updated successfully",
      user: users[userIndex],
    });
  } catch (error) {
    return sendResponse(res, 400, { message: error.message });
  }
}

async function deleteUser(req, res) {
  try {
    const id = Number(req.url.split("/")[2]);
    const users = await readUsers();

    if (!isUserExists(users, "id", id)) {
      return sendResponse(res, 404, {
        message: "User ID not found.",
      });
    }

    const updatedUsers = users.filter((user) => user.id !== id);

    await writeUsers(updatedUsers);

    return sendResponse(res, 200, {
      message: "User deleted successfully",
    });
  } catch (error) {
    return sendResponse(res, 400, {
      message: error.message,
    });
  }
}

async function getAllUsers(req, res) {
  try {
    const users = await readUsers();

    return sendResponse(res, 200, users);
  } catch (error) {
    return sendResponse(res, 400, {
      message: error.message,
    });
  }
}

async function getUserById(req, res) {
  try {
    const id = Number(req.url.split("/")[2]);

    const users = await readUsers();

    const user = users.find((user) => user.id === id);

    if (!user) {
      return sendResponse(res, 404, {
        message: "User not found",
      });
    }

    return sendResponse(res, 200, user);
  } catch (error) {
    return sendResponse(res, 400, user);
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};

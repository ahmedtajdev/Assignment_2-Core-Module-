const readUsers = require("../utils/readUsers");
const writeUsers = require("../utils/writeUsers");
const parseBody = require("../utils/parseBody");
const isUserExists = require("../utils/isUserExists");
const sendResponse = require("../utils/sendResponse");
const binarySearch = require("../utils/binarySearch");

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

    const userIndex = binarySearch(users, id);

    if (userIndex === -1) {
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

    const userIndex = binarySearch(users, id);

    if (userIndex === -1) {
      return sendResponse(res, 404, {
        message: "User ID not found.",
      });
    }

    users.splice(userIndex, 1);

    await writeUsers(users);

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

    const userIndex = binarySearch(users, id);

    if (userIndex === -1) {
      return sendResponse(res, 404, {
        message: "User not found",
      });
    }

    return sendResponse(res, 200, users[userIndex]);
  } catch (error) {
    return sendResponse(res, 400, {
      message: error.message,
    });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};

const http = require("node:http");
const { userRoutes } = require("./routes/userRoutes");
const sendResponse = require("./utils/sendResponse");

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (userRoutes(req, res)) return;

  sendResponse(res, 404, {
    message: "Route not found",
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

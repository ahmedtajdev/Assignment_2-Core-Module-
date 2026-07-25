// 1)Create an API that adds a new user to your users stored in a JSON file

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const PORT = 3000;
const filePath = path.resolve("users.json");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/user") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const newUser = JSON.parse(body);

        const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const emailExists = users.some((user) => user.email === newUser.email);

        if (emailExists) {
          res.writeHead(400, { "content-Type": "application/json" });
          return res.end(JSON.stringify({ message: "Email already exists." }));
        }

        newUser.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        users.push(newUser);

        fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

        res.writeHead(201, { "content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "User added successfully.",
            user: newUser,
          }),
        );
      } catch (err) {
        console.error(err);
        res.writeHead(400, { "content-Type": "application/json" });
        res.end(JSON.stringify({ message: err.message }));
      }
    });
  } else if (req.method === "PATCH" && req.url === "/user/id") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });
  } else {
    res.writeHead(404, { "content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found." }));
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

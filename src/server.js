import http from "http";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .writeHead(200)
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({ id: 1, name: "John Doe", email: "email@" });
    return res.end("Criar");
  }

  return res.writeHead(404).end();
});

server.listen(3333);

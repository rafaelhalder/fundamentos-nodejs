import http from "http";

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res.end("Listagem");
  }

  if (method === "POST" && url === "/users") {
    return res.end("Criar");
  }

  return res.end("Hello World");
});

server.listen(3333);

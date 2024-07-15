import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`<h1>Welcome to my my node practices<h1>`);
});

const port = 9000;

server.listen(port, () => {
  console.log(`server runing at localhost:${port}`);
});

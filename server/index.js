const http = require("http");
const fs = require("fs");

const port = 8000;

http
  .createServer((req, res) => {
    switch (req.url) {
      case "/":
        req.url = "index.html";
        break;
      case "/cars":
        req.url = "search-car.html";
        break;
    }
    let path = "public/" + req.url;
    fs.readFile(path, (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  })
  .listen(port, "localhost", () => {
    console.log(
      "Server sudah berjalan, silahkan buka http://localhost:%d",
      port
    );
  });

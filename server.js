const http = require("http");
const port = process.env.PORT || 5000;

http
  .createServer(function (req, res) {
    let url = req.url;

    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*" /* @dev First, read about security */,
      "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
      "Access-Control-Max-Age": 2592000, // 30 days
    });

    res.write(`Hello From API ${port}`);
    res.end();
  })
  .listen(port, function () {
    console.log("Server listening");
  });

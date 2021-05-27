"use strict";
const http = require("http");
const SwaggerExpress = require("swagger-express-mw");
const express = require("express");
const app = express();

// TODO Resume HERE !
// Open auction for product id 2
const redis = require("./api/helpers/redis");
redis.set(2, 0);

const setup = require("./api/helpers/setup");

app.use("/", express.static("public"));

module.exports = app; // for testing

const config = {
  appRoot: __dirname, // required config
};

// Prepare and send server for WebSocket
const server = http.createServer(app);
setup(app, server);

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  const port = process.env.PORT || 10010;
  server.listen(port);

  if (swaggerExpress.runner.swagger.paths["/hello/{name}"]) {
    console.log("try this:\ncurl http://127.0.0.1:" + port + "/hello/Scott");
  }
});

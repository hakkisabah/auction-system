const { genRes } = require("./general");
const cookieParser = require("cookie-parser");

// TODO Merging with docker compose
// const mongoose = require("mongoose");
//
// mongoose.connect("mongodb://mongo:27017/mydb").then(
//   () => {
//     console.log("mongo connected");
//   },
//   (err) => {
//     console.log("mongo connect error", err);
//   }
// );

module.exports = (app, server) => {
  /* Helper middleware */
  app.use((req, res, next) => {
    // A helper to send response as data
    res.sendData = (data) => res.json(genRes(data, 200, []));

    // A helper for cookie processing
    res.setUserCookie = (value) => res.cookie("AuctionUser", value);

    req.getUserCookie = () => req.cookies.AuctionUser;

    // We need a server for WebSocket
    req.server = server;

    next();
  });

  app.use(cookieParser());
};

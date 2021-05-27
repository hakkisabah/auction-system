const redis = require("../helpers/redis");
const user = require("./user");
// WebSocket
const WebSocket = require("ws");

const events = (req, res) => {
  const wss = new WebSocket.Server({ server: req.server });
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      message = JSON.parse(message);
      const cookie = user.check(message.cookie);
      redis.get(cookie.data.productId).then(async (userId) => {
        if (userId != 0) {
          const bid = await redis.get(userId);
          ws.send(bid);
        } else {
          ws.send(cookie.data.productPrice);
        }
      });
    });

    // const priceInterval  =setInterval(function(){
    //
    //   ws.send(data)
    //
    // }, 1000);

    ws.on("close", function close() {
      console.log("page closed");
    });
  });
};
module.exports = {
  events,
};

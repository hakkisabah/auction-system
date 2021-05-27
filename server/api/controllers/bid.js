const redis = require("../helpers/redis");
const user = require("./user");
const bid = async (req, res) => {
  let productId;
  const currentBid = req.swagger.params.productBid.value.currentBid;
  const isUser = user.check(req.swagger.params.productBid.value.userToken);
  // We need which product for auction information
  if (isUser) {
    productId = isUser.data.productId;
  } else {
    return res.json({ error: "Token error" });
  }
  // productId give last bidding user id
  redis.get(productId).then(async (auction) => {
    if (auction != null) {
      // auction is a last bidding userId and userId have last valid bid
      // and use tricky way..
      // if not have any bid last bid might be null
      const isBidded = await redis.get(auction);
      const lastBid = isBidded == null ? isUser.data.productPrice : isBidded;
      // if we have a lastBid, it's value 0 or bigger than conditional price
      console.log(currentBid);
      console.log(lastBid);
      if (parseInt(currentBid) > parseInt(lastBid)) {
        // if lastBid bigger than 0 we know it has been second or more bid.
        // So we must delete old bid
        if (lastBid > 0) redis.del(auction);
        redis.set(isUser.data.userId, currentBid).then(async () => {
          // set last vaild bid's user id to productId
          const lastBid = await redis.set(productId, isUser.data.userId);
          console.log(lastBid);
          const success = await redis.get(isUser.data.userId);
          res.json({ success, lastBid });
        });
      } else {
        res.json({ error: "limit must be bigger than last bid" });
      }
    } else {
      res.json({ error: "Critical error" });
    }
  });
};
module.exports = {
  bid,
};

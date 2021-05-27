const redisBase = require("redis");
const client = redisBase.createClient();
const { promisify } = require("util");
client.get = promisify(client.get);
client.set = promisify(client.set);
client.on("error", function (error) {
  console.error(error);
});

const set = (key, value) => {
  return client.set(key, value).then((result) => {
    return result;
  });
};
const get = (key) => {
  return client.get(key).then((val) => {
    return val;
  });
};
const del = (key) => {
  client.del(key);
};

module.exports = {
  set,
  get,
  del,
};

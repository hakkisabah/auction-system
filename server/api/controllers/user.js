const tokenizer = require("../helpers/tokenizer");

const getRandomId = () => {
  return Math.random().toString(36).slice(2);
};

const create = (auctionProduct) => {
  const data = {
    userId: getRandomId(),
    ...auctionProduct,
  };
  const tokenized = tokenizer.wrap(data);
  return tokenized;
};

const check = (token) => {
  const verified = tokenizer.verify(token);
  return verified;
};

const update = (token, data) => {
  const verified = check(token);
  if (verified) {
    for (let k in verified) data[k] = verified[k];
    const tokenized = tokenizer.wrap(data);
    return tokenized;
  } else {
    return false;
  }
};

module.exports = {
  create,
  check,
  update,
};

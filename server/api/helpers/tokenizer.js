const jwt = require("jsonwebtoken");
const secret = "secret";
const wrap = (data, expires = null) => {
  const token = jwt.sign(
    {
      data,
    },
    secret,
    expires ? { expiresIn: expires } : ""
  );
  return token;
};

const verify = (token) => {
  return jwt.verify(token, secret, function (err, decoded) {
    if (err) return false;
    return decoded;
  });
};

module.exports = {
  wrap: wrap,
  verify: verify,
};

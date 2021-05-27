const products = [
  {
    productId: 1,
    productName: "xx",
    productPrice: 100,
    isAuction: 0,
    finalQuotation: 0,
  },
  {
    productId: 2,
    productName: "yy",
    productPrice: 20,
    isAuction: 1,
    finalQuotation: 0,
  },
];
const user = require("../controllers/user");
const product = (req, res) => {
  products.find((product) => {
    if (product.productId == req.swagger.params.id.value) {
      res.setUserCookie(user.create(product));
      if (product.isAuction == 1) {
        product.lastBid = 0;
        res.render("product.pug", { ...product });
      } else {
        res.render("product.pug", { ...product });
      }
    }
  });
};

module.exports = {
  product: product,
};

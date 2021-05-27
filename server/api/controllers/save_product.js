const { Product } = require("../../models/product");

const saveProduct = (req, res) => {
  Product.save(req.swagger.product);
};
module.exports = {
  saveProduct,
};

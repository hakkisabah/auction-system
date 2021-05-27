const products = (req, res) => {
  res.json([
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
      productMinPrice: 20,
      isAuction: 1,
      finalQuotation: 0,
    },
  ]);
};

module.exports = {
  products: products,
};

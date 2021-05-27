const mongoose = require("mongoose");
const { Schema } = mongoose;
const schema = new Schema(
  {
    productId: String,
    productName: String,
    productPrice: Number,
    isAuction: String,
    finalQuotation: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

exports.Product = mongoose.model("Product", schema);

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "A product must have a name"],
      unique: true,
    },
    price: {
      type: Number,
      // required: [true, "A product must have a price"],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        // message: "Discount must be below the regular price",
      },
      default: 0.0,
    },
    ratings: {
      type: Number,
      default: 0.0,
    },
    reviews: {
      type: [String],
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: {
        values: ["Electronics", "Clothes", "Jewlery", "Food", "Berverage"],
        message:
          "Category is either: Electronics, Clothes, Jewlery, Food, Berverage",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

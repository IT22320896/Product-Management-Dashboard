import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    ID: {
      type: String,
      required: [true, "Please Enter an ID"],
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Please Enter a Name"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please Enter a Description"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please Enter a Price"],
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    image: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Use default export for easy imports
const Product = mongoose.model("Product", productSchema);

export default Product;

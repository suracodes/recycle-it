//JUST USER FOR DIGITAL WAREHOUSE. JUST B2B
//SHOW WISHLIST AND ORDERED IN DIGITAL WAREHOUSE

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  username: {
    type: String,
  },
  password: { type: String },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plasticProducts",
    },
  ],
  wishlistedProduct: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plasticProducts",
    },
  ],
});

module.exports = mongoose.model("users", userSchema);

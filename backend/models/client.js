//EVERYDAY HOUSEHOLDS OR SMALL BUISNESS B2C/B2B
//JUST CHOOSE A SHIFT
//SHOW WISHLIST AND ORDERED IN DASHBOARD
const mongoose = require("mongoose");

const orderData = new mongoose.Schema({
  quantity: { type: Number },
  price: { type: Number },
});

const clientData = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  address: { type: String },
  bankAccount: { type: Number },
  orderforclient: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plasticProducts",
    },
  ],
  wishlistforClient: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "plasticProducts",
    },
  ],
});
const Client = mongoose.model("Client", clientData);
module.exports = Client;

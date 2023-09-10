const User = require("../models/user");
const Client = require("../models/client");
const Product = require("../models/products");
const Org = require("../models/organization");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//for direct warehouse user or small buisness
const register = async (req, res) => {
  const { email, password, phone, address, pincode, username } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({
      email,
      password,
      phone,
      address,
      pincode,
      username,
    });
    await newUser.save();
    const token = jwt.sign({ email, role: "user" }, process.env.passKey, {
      expiresIn: "1h",
    });
    res.json({ message: "User created successfully", token });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    const token = jwt.sign({ email, role: "user" }, process.env.passKey, {
      expiresIn: "24h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid email or password" });
  }
};

const getProducts = async (req, res) => {
  const products = await Product.find({});
  res.json({ products });
};

const orderProduct = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      user.order.push(product);
      await user.save();
      res.json({ message: "product ordered successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const orderedHistory = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate(
      "order"
    );
    if (user) {
      res.status(200).json({ order: user.order || [] });
    } else {
      res.status(404).json("User not find");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const addinWishlist = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const user = await User.findOne({ email: req.user.email });
    if (user) {
      user.wishlistedProduct.push(product);
      await user.save();
      res.json({ message: "Product is in your wishlist" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const wishlistedItems = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).populate(
    "wishlistedProduct"
  );
  if (user) {
    res.json({ wishlistedProduct: user.wishlistedProduct || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

//for existing clients

const orderProduct2 = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const user = await Client.findOne({ email: req.user.email });
    if (user) {
      user.orderforclient.push(product);
      await user.save();

      res.json({ message: "product ordered successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const orderedHistory2 = async (req, res) => {
  try {
    const user = await Client.findOne({ email: req.user.email }).populate(
      "orderforclient"
    );
    if (user) {
      
      res.status(200).json({ orderforclient: user.orderforclient || [] });
    } else {
      res.status(404).json("User not find");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const addinWishlist2 = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const user = await Client.findOne({ email: req.user.email });
    if (user) {
      user.wishlistforClient.push(product);
      await user.save();
      res.json({ message: "Product is in your wishlist" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const wishlistedItems2 = async (req, res) => {
  const user = await Client.findOne({ email: req.user.email }).populate(
    "wishlistforClient"
  );
  if (user) {
    res.json({ wishlistforClient: user.wishlistforClient || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
};

//for companies and organizations

const orderProduct3 = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const org = await Org.findOne({ buisnessEmail: req.user.buisnessEmail });
    if (org) {
      org.orderforOrg.push(product);
      await org.save();
      res.json({ message: "product ordered successfully" });
    } else {
      res.status(403).json({ message: "Organization not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const orderedHistory3 = async (req, res) => {
  try {
    const org = await Org.findOne({
      buisnessEmail: req.user.buisnessEmail,
    }).populate("orderforOrg");
    if (org) {
      res.status(200).json({ orderforOrg: org.orderforOrg || [] });
    } else {
      res.status(404).json("Organization not find");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const addinWishlist3 = async (req, res) => {
  const product = await Product.findById(req.params.productid);
  console.log(product);
  if (product) {
    const org = await Org.findOne({ buisnessEmail: req.user.buisnessEmail });
    if (org) {
      org.wishlistforOrg.push(product);
      await org.save();
      res.json({ message: "Product is in your wishlist" });
    } else {
      res.status(403).json({ message: "Organization not found" });
    }
  } else {
    res.status(404).json({ message: "product not found" });
  }
};

const wishlistedItems3 = async (req, res) => {
  const org = await Org.findOne({
    buisnessEmail: req.user.buisnessEmail,
  }).populate("wishlistforOrg");
  if (org) {
    res.json({ wishlistforOrg: org.wishlistforOrg || [] });
  } else {
    res.status(403).json({ message: "Org not found" });
  }
};

module.exports = {
  //api for direct user or small buisness(not a plastic doner)
  register,
  login,
  getProducts,
  orderProduct,
  orderedHistory,
  addinWishlist,
  wishlistedItems,
  //api for existing clients (i.e.-user or small buisness who donates plastics)
  orderProduct2,
  orderedHistory2,
  addinWishlist2,
  wishlistedItems2,
  //api for existing Organizations (i.e.-Big organizations or Company who donates plastics)
  orderProduct3,
  orderedHistory3,
  addinWishlist3,
  wishlistedItems3,
};

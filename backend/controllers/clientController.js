const Client = require("../models/client");
const jwt = require("jsonwebtoken");

const clientRegister = async (req, res) => {
  const { name, email, password, address, bankAccount } = req.body;
  const client = await Client.findOne({ email });
  if (client) {
    res.status(403).json({ message: "Client already exists" });
  } else {
    const newClient = new Client({
      name,
      email,
      password,
      address,
      bankAccount,
    });
    await newClient.save();
    const token = jwt.sign({ email, role: "client" }, process.env.passKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Client created successfully", token });
  }
};

const clientLogin = async (req, res) => {
  const { email, password } = req.body;
  const client = await Client.findOne({ email,password });
  if (client) {
    const token = jwt.sign({ email, role: "client" }, process.env.passKey, {
      expiresIn: "24h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid email or password" });
  }
};

async function calculatePrice(weight, pricePerUnit) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalPrice = weight * pricePerUnit;
      resolve(totalPrice);
    }, 1000);
  });
}


const overallPrice = async (req, res) => {
  const clientId = req.body.clientId;
  const newOrder = req.body.order;
  const { weight } = req.body;
  const pricePerKilogram = 25;

  try {
    const client = await Client.findByIdAndUpdate(clientId, {
      $push: { orders: newOrder },
    });

    const totalPrice = await calculatePrice(weight, pricePerKilogram);
    res.status(200).json({
      message: `The total price for ${weight} kg is ${totalPrice} INR.`,
      client,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  clientRegister: clientRegister,
  clientLogin: clientLogin,
  claimedAmount: overallPrice,
};

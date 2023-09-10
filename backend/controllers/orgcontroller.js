const Organization = require("../models/organization");
const jwt = require("jsonwebtoken");

const registerOrg = async (req, res) => {
  const { name, buisnessEmail, password, address, buisnessBankAccount } =
    req.body;
  const org = await Organization.findOne({ buisnessEmail });
  if (org) {
    res.status(403).json({ message: "Organization already exists" });
  } else {
    const newOrg = new Organization({
      name,
      buisnessEmail,
      password,
      address,
      buisnessBankAccount,
    });
    await newOrg.save();
    const token = jwt.sign(
      { buisnessEmail, role: "organization" },
      process.env.passKey,
      {
        expiresIn: "1h",
      }
    );
    res.json({ message: "Organization added successfully", token });
  }
};


const orgLogin = async (req, res) => {
  const { buisnessEmail, password } = req.body;
  const org = await Organization.findOne({ buisnessEmail, password });
  if (org) {
    const token = jwt.sign(
      { buisnessEmail, role: "organization" },
      process.env.passKey,
      {
        expiresIn: "24h",
      }
    );
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

const overall = async (req, res) => {
  try {
    const { weight } = req.body;
    const pricePerKilogram = 25;

    const totalPrice = await calculatePrice(weight, pricePerKilogram);
    res.json({
      message: `Overall price for ${weight} kg is ${totalPrice} INR.`,
    });
  } catch (error) {
    res.status(403).json({ message: "an error occured" });
  }
};

module.exports = {
  registerOrg,
  orgLogin,
  overall,
};

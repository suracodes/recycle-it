const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

app.use(express.json());

const port = process.env.PORT || 5000

app.get("/", (req, res) => res.send("this is dashboard!"));

//donates used plastic and also buy recycled products
app.use("/client", require("./routes/clientRoutes"));
app.use("/org", require("./routes/orgRoutes"));

//direct recycled product buyer (user/small buisness)
app.use("/user", require("./routes/userRoutes"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "waste-management",
  })
  .then(console.log(`MongoDB connected`))
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

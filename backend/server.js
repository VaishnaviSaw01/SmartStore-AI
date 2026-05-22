const express = require("express");
const cors = require("cors");

require("dotenv").config();

const connectDB =
  require("./config/db");

const authRoutes =
  require("./routes/authRoutes");

const productRoutes =
  require("./routes/productRoutes");

const app = express();
const aiRoutes =
  require("./routes/aiRoutes");
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/ai", aiRoutes);
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/products",
  productRoutes
);

app.get("/", (req, res) => {

  res.send(
    "SmartStore AI Backend Running"
  );

});

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});
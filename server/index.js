const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const geminiRoutes = require("./routes/geminiRoutes");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

connectDB();

app.use(
  cors({
    origin: process.env.Frontend_Url, // Array for multiple origins
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", geminiRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

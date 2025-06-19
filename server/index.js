const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const geminiRoutes = require("./routes/geminiRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", geminiRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});

const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  firebaseLogin,
} = require("../controllers/authController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/firebase-login", firebaseLogin);

module.exports = router;

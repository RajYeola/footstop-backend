const express = require("express");
const router = express.Router();
const {
  getUser,
  createNewUser,
  signinUser,
} = require("../controllers/user.controller");

router.get("/", getUser);
router.post("/signup", createNewUser);
router.post("/signin", signinUser);

module.exports = router;

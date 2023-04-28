const userController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/userProfile", userController.userProfile);
router.delete("/deleteuser", userController.deleteUserProfile);
router.get("/getAllUser", userController.getAllUser);

module.exports = router;

const express = require("express");
const {
  getUsers,
  getUserById,
  updateUser,
  getDashboardData,
} = require("../controllers/userController");
const { requireClerkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getUsers);
router.get("/dashboard", requireClerkUser, getDashboardData);
router.put("/update", requireClerkUser, updateUser);
router.get("/:id", getUserById);

module.exports = router;

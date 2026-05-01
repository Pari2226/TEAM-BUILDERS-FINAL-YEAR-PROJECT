const express = require("express");
const { getCurrentUser } = require("../controllers/authController");
const { requireClerkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/me", requireClerkUser, getCurrentUser);
router.get("/profile", requireClerkUser, getCurrentUser);

module.exports = router;

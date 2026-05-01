const express = require("express");
const {
  recommendTeammates,
} = require("../controllers/recommendationController");
const { requireClerkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/recommend-team", requireClerkUser, recommendTeammates);

module.exports = router;

const express = require("express");
const {
  createTeam,
  getTeams,
  getTeamById,
  joinTeam,
  deleteTeam,
} = require("../controllers/teamController");
const { requireClerkUser } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", requireClerkUser, createTeam);
router.post("/create", requireClerkUser, createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.post("/join/:id", requireClerkUser, joinTeam);
router.delete("/:id", requireClerkUser, deleteTeam);

module.exports = router;

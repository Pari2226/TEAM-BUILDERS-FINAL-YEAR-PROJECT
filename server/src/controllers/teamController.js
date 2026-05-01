const axios = require("axios");
const Team = require("../models/Team");
const User = require("../models/User");

const createTeam = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    if (!req.user?._id) {
      return res.status(401).json({ success: false, error: "Not authorized" });
    }

    const {
      teamName,
      description,
      requiredSkills,
      maxMembers,
      tags,
      projectType,
      status,
    } = req.body;

    if (!teamName || !description) {
      return res.status(400).json({
        success: false,
        error: "Team name and description are required",
      });
    }

    const parsedSkills = Array.isArray(requiredSkills)
      ? requiredSkills
      : typeof requiredSkills === "string"
        ? requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [];
    const parsedMaxMembers = Number.isFinite(Number(maxMembers))
      ? Number(maxMembers)
      : 5;
    const allowedStatuses = ["Open", "In Progress", "Completed"];
    const normalizedStatus = allowedStatuses.includes(status) ? status : "Open";

    const team = await Team.create({
      teamName: teamName.trim(),
      description: description.trim(),
      requiredSkills: parsedSkills,
      maxMembers: parsedMaxMembers,
      tags: Array.isArray(tags) ? tags : [],
      projectType: projectType?.trim() || "",
      status: normalizedStatus,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    return res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Create team error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Unable to create team" });
  }
};

const getTeams = async (req, res) => {
  const teams = await Team.find()
    .populate("createdBy", "name image profileImage role")
    .populate("members", "name image profileImage role skills");
  res.json({ teams });
};

const getTeamById = async (req, res) => {
  const team = await Team.findById(req.params.id)
    .populate("createdBy", "name image profileImage role")
    .populate("members", "name image profileImage role skills");

  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  res.json({ team });
};

const joinTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  const alreadyMember = team.members.some(
    (memberId) => memberId.toString() === req.user._id.toString(),
  );
  if (alreadyMember) {
    return res.status(400).json({ message: "Already a member" });
  }

  if (team.members.length >= team.maxMembers) {
    return res.status(400).json({ message: "Team is full" });
  }

  team.members.push(req.user._id);
  await team.save();

  res.json({ message: "Joined team successfully", team });
};

const deleteTeam = async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  if (team.createdBy.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "Only the creator can delete this team" });
  }

  await team.deleteOne();
  res.json({ message: "Team deleted successfully" });
};

const recommendTeammates = async (req, res) => {
  const { skills } = req.body;
  const response = await axios.post(
    `${process.env.RECOMMENDATION_SERVICE_URL || "http://127.0.0.1:5001"}/recommend`,
    { skills: skills?.length ? skills : req.user.skills || [] },
  );
  res.json(response.data);
};

module.exports = {
  createTeam,
  getTeams,
  getTeamById,
  joinTeam,
  deleteTeam,
  recommendTeammates,
};

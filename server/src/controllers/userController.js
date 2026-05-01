const User = require("../models/User");
const Team = require("../models/Team");

const getUsers = async (_req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json({ users });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
};

const updateUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    const { name, role, skills, bio, github, linkedin, image, profileImage } =
      req.body;

    const updates = {};
    if (typeof name === "string" && name.trim()) {
      updates.name = name.trim();
    }
    if (
      typeof role === "string" &&
      User.schema.path("role").enumValues.includes(role)
    ) {
      updates.role = role;
    }
    if (Array.isArray(skills)) {
      updates.skills = skills
        .map((skill) => String(skill).trim())
        .filter(Boolean);
    } else if (typeof skills === "string") {
      updates.skills = skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean);
    }
    if (typeof bio === "string") {
      updates.bio = bio;
    }
    if (typeof github === "string") {
      updates.github = github.trim();
    }
    if (typeof linkedin === "string") {
      updates.linkedin = linkedin.trim();
    }

    const nextImage =
      typeof image === "string"
        ? image.trim()
        : typeof profileImage === "string"
          ? profileImage.trim()
          : undefined;
    if (nextImage !== undefined) {
      updates.image = nextImage;
      updates.profileImage = nextImage;
    }

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, error: "No profile changes provided" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Update profile error:", error.message);
    return res
      .status(500)
      .json({ success: false, error: "Unable to update profile" });
  }
};

const getDashboardData = async (req, res) => {
  const teams = await Team.find({ members: req.user._id })
    .sort({ createdAt: -1 })
    .limit(6);
  const recommendedTeams = await Team.find({
    requiredSkills: { $in: req.user.skills || [] },
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .populate("createdBy", "name");

  res.json({
    profileCompletion: Math.min(100, 35 + (req.user.skills?.length || 0) * 10),
    myTeams: teams,
    joinedProjects: [],
    recommendedTeammates: [],
    recommendedTeams,
    recentActivity: [
      {
        title: "Profile updated",
        description: "Your profile looks more complete now.",
      },
      {
        title: "New match found",
        description: "Suggested teammates were refreshed.",
      },
    ],
  });
};

module.exports = { getUsers, getUserById, updateUser, getDashboardData };

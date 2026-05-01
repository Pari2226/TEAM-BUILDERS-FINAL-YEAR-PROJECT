const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    requiredSkills: [{ type: String, trim: true }],
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    maxMembers: { type: Number, default: 5 },
    projectType: { type: String, default: "" },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Completed"],
      default: "Open",
    },
    tags: [{ type: String, trim: true }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Team", teamSchema);

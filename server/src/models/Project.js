const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    techStack: [{ type: String, trim: true }],
    teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
    status: {
      type: String,
      enum: ["Planning", "Active", "Completed"],
      default: "Planning",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Project", projectSchema);

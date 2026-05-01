const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: { type: String, default: "" },
    profileImage: { type: String, default: "" },
    role: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "ML",
        "UI/UX Designer",
        "Founder",
        "Other",
      ],
      default: "Full Stack",
    },
    skills: [{ type: String, trim: true }],
    bio: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);

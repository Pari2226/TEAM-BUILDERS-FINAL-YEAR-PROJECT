const User = require("../models/User");

const getEmail = (clerkUser) =>
  clerkUser?.primaryEmailAddress?.emailAddress ||
  clerkUser?.emailAddresses?.[0]?.emailAddress ||
  "";

const getName = (clerkUser) =>
  [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ") ||
  clerkUser?.username ||
  getEmail(clerkUser) ||
  "Team Builder";

const syncUserFromClerk = async (clerkUser) => {
  if (!clerkUser?.id) {
    throw new Error("Missing Clerk user identity");
  }

  const image = clerkUser.imageUrl || "";
  const payload = {
    clerkId: clerkUser.id,
    name: getName(clerkUser),
    email: getEmail(clerkUser),
    image,
    profileImage: image,
  };

  let user = await User.findOne({ clerkId: clerkUser.id });
  if (!user) {
    user = await User.create({
      ...payload,
      role: "Full Stack",
      skills: [],
      bio: "",
      github: "",
      linkedin: "",
    });
    return user;
  }

  const updates = {};
  if (payload.email) {
    updates.email = payload.email;
  }
  if (!user.name && payload.name) {
    updates.name = payload.name;
  }
  if (!user.image && !user.profileImage && payload.image) {
    updates.image = payload.image;
    updates.profileImage = payload.profileImage;
  }

  if (Object.keys(updates).length > 0) {
    user = await User.findByIdAndUpdate(
      user._id,
      { $set: updates },
      { new: true },
    );
  }

  return user;
};

const toPublicUser = (user) => ({
  _id: user._id,
  clerkId: user.clerkId,
  name: user.name,
  email: user.email,
  image: user.image || user.profileImage || "",
  profileImage: user.profileImage || user.image || "",
  role: user.role,
  skills: user.skills,
  bio: user.bio,
  github: user.github,
  linkedin: user.linkedin,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

module.exports = { syncUserFromClerk, toPublicUser };

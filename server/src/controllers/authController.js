const { toPublicUser } = require("../utils/clerkUser");

const getCurrentUser = async (req, res) => {
  return res.json({ user: toPublicUser(req.user) });
};

module.exports = { getCurrentUser };

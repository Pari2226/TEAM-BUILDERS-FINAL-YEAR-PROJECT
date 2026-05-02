const { clerkClient, getAuth } = require("@clerk/express");
const { syncUserFromClerk } = require("../utils/clerkUser");

const requireClerkUser = async (req, res, next) => {
  try {
    const auth = getAuth(req);
    if (!auth?.userId) {
      console.warn("[Auth] Missing Clerk userId");
      return res.status(401).json({ message: "Not authorized" });
    }

    const clerkUser = await clerkClient.users.getUser(auth.userId);
    const mongoUser = await syncUserFromClerk(clerkUser);

    req.auth = auth;
    req.clerkUser = clerkUser;
    req.user = mongoUser;
    next();
  } catch (error) {
    console.error("[Auth] Clerk auth error:", error.message);
    return res.status(401).json({ message: "Not authorized" });
  }
};

const requireClerkAuth = (req, res, next) => {
  const auth = getAuth(req);
  if (!auth?.userId) {
    return res.status(401).json({ message: "Not authorized" });
  }

  req.auth = auth;
  next();
};

module.exports = { requireClerkAuth, requireClerkUser };

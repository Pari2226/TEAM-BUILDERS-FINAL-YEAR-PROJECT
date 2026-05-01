const axios = require("axios");

const recommendTeammates = async (req, res) => {
  const { skills } = req.body;
  const response = await axios.post(
    `${process.env.RECOMMENDATION_SERVICE_URL || "http://127.0.0.1:5001"}/recommend`,
    { skills: skills?.length ? skills : req.user.skills || [] },
  );
  res.json(response.data);
};

module.exports = { recommendTeammates };

const express = require("express");
const router = express.Router();
const { getRatingsAndRanks } = require("../db/ratingRank");

router.get("/rankings", async (req, res) => {
  try {
    console.log("GET /api/rankings called");
    const result = await getRatingsAndRanks();
    console.log("Ranking result:", result);

    if (!result || result.length === 0) {
      return res.status(200).json({ message: "No rankings available yet" });
    }

    res.json(result);
  } catch (err) {
    console.error("Detailed error:", {
      message: err.message,
      stack: err.stack,
      code: err.code,
    });
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
});

module.exports = router;

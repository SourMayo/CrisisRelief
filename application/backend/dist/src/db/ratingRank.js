const { db } = require("./index");

// Add a new rating
async function addRating(resourceId, userId, rating) {
  try {
    await db("ratings").insert({
      resource_id: resourceId,
      user_id: userId,
      rating,
    });
    console.log("Rating added successfully");
  } catch (error) {
    console.error("Error adding rating:", error);
    throw error;
  }
}

async function getAverageRatings() {
  try {
    const results = await db("ratings")
      .select("resource_id")
      .avg("rating as average_rating")
      .groupBy("resource_id");
    return results;
  } catch (error) {
    console.error("Error fetching average ratings:", error);
    throw error;
  }
}

async function getRatingsAndRanks() {
  try {
    const results = await db("resources")
      .select("resources.*")
      .leftJoin("ratings", "resources.id", "ratings.resource_id")
      .select(db.raw("ROUND(AVG(ratings.rating), 2) as average_rating"))

      .groupBy("resources.id")
      .orderBy("average_rating", "desc");
    return results;
  } catch (error) {
    console.error("Error fetching ranked resources:", error);
    throw error;
  }
}

module.exports = {
  addRating,
  getAverageRatings,
  getRatingsAndRanks, // This matches your router import
  getRankedResources: getRatingsAndRanks, // Alternate name
};

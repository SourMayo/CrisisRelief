import { Router } from "express";
import { db } from "../db";

export const reviewsRouter = Router();

reviewsRouter.post("/", async (req, res) => {
  const { content, rating, user_id, location_id } = req.body;

  if (!content || !rating || !user_id || !location_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await db("reviews").insert({
      content,
      rating,
      user_id,
      location_id,
    });

    res.status(201).json({ message: "Review submitted successfully" });
    console.log("Review submitted successfully");
  } catch (error) {
    console.error("Error inserting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

reviewsRouter.get("/", async (req, res) => {
  const locationId = parseInt(req.query.location_id as string);

  if (!locationId) {
    return res.status(400).json({ error: "Missing or invalid location_id" });
  }

  try {
    const reviews = await db("reviews")
      .where({ location_id: locationId })
      .orderBy("created_at", "desc");

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

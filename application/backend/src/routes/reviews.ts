import { Router } from "express";
import { db } from "../db";

export const reviewsRouter = Router();

reviewsRouter.post("/", async (req, res) => {
  const { content, rating, user_id, location_id: place_id } = req.body;

  if (!content || !rating || !user_id || !place_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Try to find location by place_id
    const location = await db("locations").where({ place_id }).first();

    let location_id;

    if (!location) {
      // 2. If not found, insert a minimal location row
      const [newLocation] = await db("locations")
        .insert({
          place_id,
          name: "Unknown Shelter",
          description: "Automatically added from Google Places.",
          type: "shelter",
          open_hours: "Unknown",
          url: `https://maps.google.com/?q=${encodeURIComponent(place_id)}`,
          street: "Unknown",
          city: "Unknown",
          state: "CA",
          zipcode: "00000",
        })
        .returning("*");

      location_id = newLocation.location_id;
    } else {
      location_id = location.location_id;
    }
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

// GET: Fetch reviews for a place_id
reviewsRouter.get("/", async (req, res) => {
  const place_id = req.query.location_id as string;

  if (!place_id) {
    return res.status(400).json({ error: "Missing location_id" });
  }

  try {
    const location = await db("locations")
      .select("location_id")
      .where({ place_id })
      .first();

    if (!location) {
      return res.json([]); 
    }

    const reviews = await db("reviews")
      .where({ location_id: location.location_id })
      .orderBy("created_at", "desc");

    res.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

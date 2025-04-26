import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const googleRouter = Router();
const GOOGLE_API_KEY = "AIzaSyDfeXWLWeO3WA15MY8AD55aprDhvuTOKFQ";

googleRouter.get("/places", async (req, res) => {
  const { query, lat, lng, type } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  const locationBias = lat && lng ? `location=${lat},${lng}&radius=5000` : "";
  const includedType = type ? `&type=${type}` : "";

  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}${includedType}&${locationBias}&key=${GOOGLE_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Google Places API Error");

    const data = await response.json();
    res.json(data);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch from Google Maps API" });
  }
});

export { googleRouter };

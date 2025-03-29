// controllers/searchController.ts
import { Request, Response } from "express";
import search from "../routes/search";

export const searchController = async (req: Request, res: Response) => {
  const category = req.query.category as string; // e.g., "Locations" or "All Categories"
  const query = req.query.query as string;

  if (!query?.trim()) {
    return res.status(400).json({ error: "Search query is required." });
  }

  try {
    // If a specific category is selected, run that search
    if (category && category !== "All Categories") {
      let results;
      switch (category) {
        case "Locations":
          results = await search.simpleLocations(query);
          break;
        case "Weather Zones":
          results = await search.simpleWeatherZones(query);
          break;
        case "Reviews":
          results = await search.simpleReviews(query);
          break;
        case "Food Banks":
          results = await search.simpleFoodBanks(query);
          break;
        default:
          return res.status(400).json({ error: "Invalid category." });
      }
      return res.json(results);
    } else {
      const [locations, weatherZones, reviews, foodBanks] = await Promise.all([
        search.simpleLocations(query).catch(() => []),
        search.simpleWeatherZones(query).catch(() => []),
        search.simpleReviews(query).catch(() => []),
        search.simpleFoodBanks(query).catch(() => []),
      ]);

      return res.json({
        locations: locations || [],
        weatherZones: weatherZones || [],
        reviews: reviews || [],
        foodBanks: foodBanks || [],
      });
    }
  } catch (error: any) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

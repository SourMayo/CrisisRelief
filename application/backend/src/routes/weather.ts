import { Router } from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const weatherRouter = Router();
const WEATHER_API_KEY = "0e9dfcc644d742f9b3b205520252504";

weatherRouter.get("/", async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    const cityParam = Array.isArray(city) ? city[0] : city;


    console.log("🌤️ Weather request received for:", cityParam);

    const url = `http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cityParam as string)}&aqi=yes`;

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({ error: "Weather API error" });
    }

    const data = await response.json();

    if (data.error) {
      return res.status(404).json({ error: data.error.message || "City not found" });
    }

    res.json(data);
  } catch (error: any) {
    console.error("Error fetching weather:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export { weatherRouter };

// services/search.ts
import { db } from "../db";

const search = {
  async simpleLocations(userInput: string) {
    return db
      .select("locations.*")
      .from("locations")
      .whereRaw(
        `
        to_tsvector('english', 
          coalesce(locations.name, '') || ' ' ||
          coalesce(locations.description, '') || ' ' ||
          coalesce(locations.address, '')
        ) @@ plainto_tsquery('english', ?)
      `,
        [userInput.toLowerCase() + ":*"]
      );
  },

  async simpleWeatherZones(userInput: string) {
    return db
      .select("weather_zones.*", "locations.name as location_name")
      .from("weather_zones")
      .join("locations", "weather_zones.location_id", "locations.location_id")
      .whereRaw(
        `
        to_tsvector('english', 
          coalesce(locations.name, '') || ' ' ||
          coalesce(weather_zones.weather_info::text, '')
        ) @@ plainto_tsquery('english', ?)
      `,
        [userInput.toLowerCase() + ":*"]
      );
  },
  async simpleFoodBanks(userInput: string) {
    return db
      .select([
        "food_banks.*",
        db.raw("locations.name as location_name"), // Get name from locations
      ])
      .from("food_banks")
      .join("locations", "food_banks.location_id", "locations.location_id")
      .whereRaw(
        `
        to_tsvector('english',
          coalesce(locations.name, '') || ' ' || 
          coalesce(food_banks.inventory::text, '')
        ) @@ plainto_tsquery('english', ?)
      `,
        [userInput.toLowerCase() + ":*"]
      );
  },

  async simpleReviews(userInput: string) {
    return db
      .select("reviews.*", "locations.name as location_name")
      .from("reviews")
      .join("locations", "reviews.location_id", "locations.location_id")
      .whereRaw(
        `
        to_tsvector('english', 
          coalesce(reviews.content, '')
        ) @@ plainto_tsquery('english', ?)
      `,
        [userInput.toLowerCase() + ":*"]
      );
  },
};

export default search;

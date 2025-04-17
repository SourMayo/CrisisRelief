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
          coalesce(locations.street, '') || ' ' ||
          coalesce(locations.city, '') || ' ' ||
          coalesce(locations.state, '') || ' ' ||
          coalesce(locations.zipcode, '')
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
        "locations.*",
        db.raw("json_agg(DISTINCT inventory.name) as inventory"),
        db.raw("json_agg(DISTINCT items_needed.name) as items_needed"),
      ])
      .from("locations")
      .leftJoin("inventory", "locations.location_id", "inventory.location_id")
      .leftJoin(
        "items_needed",
        "locations.location_id",
        "items_needed.location_id"
      )
      .where("locations.type", "food_bank")
      .whereRaw(
        `to_tsvector('english',
          coalesce(locations.name, '') || ' ' ||
          coalesce(locations.description, '') || ' ' ||
          coalesce(inventory.name, '') || ' ' ||
          coalesce(items_needed.name, '')
        ) @@ plainto_tsquery('english', ?)`,
        [`${userInput.toLowerCase()}:*`]
      )
      .groupBy("locations.location_id");
  },

  async simpleReviews(userInput: string) {
    return db
      .select(
        "reviews.*",
        "locations.name as location_name",
        "users.username as reviewer"
      )
      .from("reviews")
      .join("locations", "reviews.location_id", "locations.location_id")
      .leftJoin("users", "reviews.user_id", "users.user_id")
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

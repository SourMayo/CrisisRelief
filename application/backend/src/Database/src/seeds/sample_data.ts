import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Delete dependent records first to avoid foreign key constraint issues
  await knex("food_banks").del();
  await knex("weather_zones").del();
  await knex("locations").del();

  // Insert sample locations and return the inserted rows (PostgreSQL returns an array of objects)
  const insertedLocations = await knex("locations")
    .insert([
      {
        address: "123 Main St",
        type: "Urban",
        name: "Central City",
        photos: ["photo1.jpg", "photo2.jpg"],
        description: "The heart of the city.",
        is_high_risk: false,
        is_safe_zone: true,
      },
      {
        address: "456 Side St",
        type: "Rural",
        name: "Small Town",
        photos: ["town1.jpg"],
        description: "A quiet town.",
        is_high_risk: true,
        is_safe_zone: false,
      },
      {
        address: "789 Park Ave",
        type: "Suburban",
        name: "Central Park District",
        photos: ["park1.jpg"],
        description: "Green area in the city center.",
        is_high_risk: false,
        is_safe_zone: true,
      },
      {
        address: "321 Mountain Rd",
        type: "Rural",
        name: "NORTHERN REGION",
        photos: ["mountain1.jpg"],
        description: "Northern mountainous area",
        is_high_risk: true,
        is_safe_zone: false,
      },
      {
        name: "Central City Urban Area",
        address: "789 Downtown Ave",
        type: "Urban",
        photos: ["central1.jpg"],
        description: "Main metropolitan area with multiple services",
        is_high_risk: false,
        is_safe_zone: true,
      },
      {
        name: "Central Park District",
        address: "456 Green Valley Rd",
        type: "Park",
        photos: ["parkday.jpg"],
        description: "Large green space with emergency shelters",
        is_high_risk: false,
        is_safe_zone: true,
      },
    ])
    .returning("location_id");

  // Depending on your PostgreSQL and Knex configuration, insertedLocations
  // might be an array of objects (e.g., [{ location_id: 1 }, { location_id: 2 }])
  // or just an array of IDs.
  // We use a helper function to extract the id.
  const getLocationId = (loc: any) => (loc.location_id ? loc.location_id : loc);

  const locationIds = insertedLocations.map(getLocationId);

  // Insert sample food banks using the location_ids
  await knex("food_banks").insert([
    {
      location_id: locationIds[0],
      max_capacity: 100,
      current_capacity: 50,
      inventory: { items: ["bread", "water", "rice"] },
      // The "shortage" column is generated automatically
    },
    {
      location_id: locationIds[1],
      max_capacity: 80,
      current_capacity: 80,
      inventory: { items: ["beans", "pasta"] },
    },
    {
      location_id: insertedLocations[0].location_id,
      max_capacity: 200,
      current_capacity: 150,
      inventory: {
        items: ["bread", "water", "canned vegetables", "baby formula"],
        dietary: ["gluten-free", "diabetic-friendly"],
      },
    },
    {
      location_id: insertedLocations[1].location_id,
      max_capacity: 100,
      current_capacity: 90,
      inventory: {
        items: ["rice", "pasta", "cereal", "canned fruits"],
        special: ["emergency kits"],
      },
    },
  ]);

  // Insert sample weather zones using the location_ids
  await knex("weather_zones").insert([
    {
      location_id: locationIds[0],
      weather_info: { temperature: "22°C", condition: "Sunny" },
      last_updated: knex.fn.now(),
    },
    {
      location_id: locationIds[1],
      weather_info: { temperature: "15°C", condition: "Cloudy" },
      last_updated: knex.fn.now(),
    },
    {
      location_id: insertedLocations[0].location_id,
      weather_info: {
        temperature: "22°C",
        condition: "sunny",
        alert: "UV index high",
      },
    },
    {
      location_id: insertedLocations[1].location_id,
      weather_info: {
        temperature: "18°C",
        condition: "cloudy",
        forecast: "possible evening showers",
      },
    },
  ]);

  await knex("reviews").insert([
    {
      location_id: insertedLocations[0].location_id,
      user_id: 1, // Assume user exists
      content:
        "Central City services were quick to respond during the last power outage. Well-stocked food bank!",
    },
    {
      location_id: insertedLocations[1].location_id,
      user_id: 2,
      content:
        "Park District weather updates saved us from getting caught in sudden rain. Cloudy mornings but clear afternoons.",
    },
  ]);
}

import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries in proper order
  await knex("weather_zones").del();
  await knex("high_risk_areas").del();
  await knex("reviews").del();
  await knex("search_history").del();
  await knex("sessions").del();
  await knex("sent_notifications").del();
  await knex("notifications").del();
  await knex("user_views").del();
  await knex("saved_locations").del();
  await knex("workers").del();
  await knex("roles").del();
  await knex("actions").del();
  await knex("inventory").del();
  await knex("items_needed").del();
  await knex("lodgings").del();
  await knex("updates").del();
  await knex("users").del();
  await knex("locations").del();

  // Inserts seed entries

  // Users: Do not supply user_id so that the DB auto-generates and we capture them.
  const insertedUsers = await knex("users")
    .insert([
      {
        first_name: "John",
        middle_name: "Michael",
        last_name: "Doe",
        username: "johndoe",
        email: "john@example.com",
        hashed_password: "hashed_password_123",
        phone_number: "555-1234",
        date_of_birth: new Date("1990-01-01"),
      },
      {
        first_name: "Jane",
        middle_name: "",
        last_name: "Smith",
        username: "janesmith",
        email: "jane@example.com",
        hashed_password: "hashed_password_456",
        phone_number: "555-5678",
        date_of_birth: new Date("1985-05-15"),
      },
      {
        first_name: "Alice",
        middle_name: "B.",
        last_name: "Cooper",
        username: "alicecooper",
        email: "alice@example.com",
        hashed_password: "hashed_password_789",
        phone_number: "555-9012",
        date_of_birth: new Date("1992-07-20"),
      },
    ])
    .returning("user_id");

  // Capture the auto-generated user IDs in an array.
  const userIds = insertedUsers.map((u) => u.user_id);

  // Locations: Using fixed location_id values for predictable foreign keys.
  await knex("locations").insert([
    {
      location_id: 1,
      type: "shelter",
      name: "Main City Shelter",
      description: "24/7 emergency shelter providing safety and care.",
      open_hours: "Always open",
      photos: [
        "https://example.com/photo1.jpg",
        "https://example.com/photo2.jpg",
      ],
      url: "https://shelter.example.com",
      street: "123 Main St",
      city: "Metropolis",
      state: "NY",
      zipcode: "10001",
    },
    {
      location_id: 2,
      type: "food_bank",
      name: "Community Food Bank",
      description:
        "Non-perishable food distribution center serving the community.",
      open_hours: "Mon-Fri 9am-5pm",
      photos: ["https://example.com/food1.jpg"],
      url: "https://foodbank.example.com",
      street: "456 Oak Ave",
      city: "Metropolis",
      state: "NY",
      zipcode: "10002",
    },
    {
      location_id: 3,
      type: "shelter",
      name: "Downtown Emergency Shelter",
      description:
        "Emergency shelter in downtown Metropolis with on-site medical assistance and recovery services.",
      open_hours: "24/7",
      photos: ["https://example.com/downtown1.jpg"],
      url: "https://downtownshelter.example.com",
      street: "789 Central Ave",
      city: "Metropolis",
      state: "NY",
      zipcode: "10003",
    },
    {
      location_id: 4,
      type: "food_bank",
      name: "Downtown Food Hub",
      description:
        "Provides fresh produce and canned goods to the local community.",
      open_hours: "Mon-Fri 8am-6pm",
      photos: ["https://example.com/downtownfood.jpg"],
      url: "https://downtownfoodhub.example.com",
      street: "321 Broadway",
      city: "Metropolis",
      state: "NY",
      zipcode: "10004",
    },
    {
      location_id: 5,
      type: "shelter",
      name: "Suburban Family Shelter",
      description:
        "A spacious shelter offering long-term accommodations for families.",
      open_hours: "24/7",
      photos: ["https://example.com/suburbanshelter.jpg"],
      url: "https://suburbanshelter.example.com",
      street: "555 Maple St",
      city: "Smallville",
      state: "KS",
      zipcode: "66002",
    },
  ]);

  // Actions
  await knex("actions").insert([
    { action_id: 1, description: "manage_users" },
    { action_id: 2, description: "post_updates" },
    { action_id: 3, description: "manage_locations" },
  ]);

  // Roles
  await knex("roles").insert([
    { role_id: 1, action_id: 1 },
    { role_id: 2, action_id: 2 },
    { role_id: 3, action_id: 3 },
  ]);

  // Workers: Using captured user IDs.
  await knex("workers").insert([
    { user_id: userIds[0], location_id: 1, role_id: 1 },
    { user_id: userIds[1], location_id: 2, role_id: 2 },
    { user_id: userIds[2], location_id: 3, role_id: 3 },
  ]);

  // User Views
  await knex("user_views").insert([
    { user_id: userIds[0], location_id: 1, viewed_at: new Date("2023-01-01") },
    { user_id: userIds[1], location_id: 2, viewed_at: new Date("2023-01-02") },
    { user_id: userIds[2], location_id: 3, viewed_at: new Date("2023-01-03") },
    { user_id: userIds[0], location_id: 4, viewed_at: new Date("2023-01-04") },
    { user_id: userIds[1], location_id: 5, viewed_at: new Date("2023-01-05") },
  ]);

  // Notifications
  await knex("notifications").insert([
    { notification_id: 1, location_id: 1, message: "Shelter at full capacity" },
    {
      notification_id: 2,
      location_id: 2,
      message: "Food donation drive today",
    },
    {
      notification_id: 3,
      location_id: 3,
      message: "Emergency medical assistance available",
    },
  ]);

  // Sent Notifications
  await knex("sent_notifications").insert([
    { user_id: userIds[0], notification_id: 1, is_read: true },
    { user_id: userIds[1], notification_id: 2, is_read: false },
    { user_id: userIds[2], notification_id: 3, is_read: true },
  ]);

  // Saved Locations
  await knex("saved_locations").insert([
    { user_id: userIds[0], location_id: 2 },
    { user_id: userIds[1], location_id: 1 },
    { user_id: userIds[2], location_id: 3 },
    { user_id: userIds[0], location_id: 4 },
    { user_id: userIds[1], location_id: 5 },
  ]);

  // Inventory
  await knex("inventory").insert([
    { name: "Blankets", quantity: 100, location_id: 1 },
    { name: "Canned Food", quantity: 500, location_id: 2 },
    { name: "Water Bottles", quantity: 300, location_id: 4 },
    { name: "First Aid Kits", quantity: 50, location_id: 5 },
  ]);

  // Items Needed
  await knex("items_needed").insert([
    { name: "Winter Coats", location_id: 1 },
    { name: "Baby Formula", location_id: 2 },
    { name: "First Aid Kits", location_id: 3 },
    { name: "Diapers", location_id: 4 },
    { name: "Hygiene Kits", location_id: 5 },
  ]);

  // Lodgings
  await knex("lodgings").insert([
    {
      location_id: 1,
      max_capacity: 200,
      current_capacity: 150,
      type: "shelter",
      name: "Main City Shelter",
      description: "24/7 emergency shelter providing safety and care.",
      street: "123 Main St",
      city: "Metropolis",
      state: "NY",
      zipcode: "10001",
    },
    {
      location_id: 3,
      max_capacity: 100,
      current_capacity: 90,
      type: "shelter",
      name: "Downtown Emergency Shelter",
      description: "Emergency shelter in downtown with temporary housing.",
      street: "789 Central Ave",
      city: "Metropolis",
      state: "NY",
      zipcode: "10003",
    },
  ]);

  // Updates
  await knex("updates").insert([
    {
      user_id: userIds[0],
      content: "New shipment of blankets arrived",
      created_at: new Date("2023-01-01 10:00:00"),
    },
    {
      user_id: userIds[1],
      content: "Food supplies running low at the Community Food Bank",
      created_at: new Date("2023-01-02 11:00:00"),
    },
    {
      user_id: userIds[2],
      content: "Downtown Emergency Shelter is now open for new intakes",
      created_at: new Date("2023-01-03 12:00:00"),
    },
    {
      user_id: userIds[0],
      content: "Suburban Family Shelter now accepting applications",
      created_at: new Date("2023-02-01 09:00:00"),
    },
  ]);

  // High Risk Areas
  await knex("high_risk_areas").insert([
    {
      location_id: 1,
      description: "Flood-prone zone",
      safe_zones: "Main Shelter",
      street: "123 Main St",
      city: "Metropolis",
      state: "NY",
      zipcode: "10001",
      latitude: 40.712776,
      longitude: -74.005974,
      radius_miles: 2,
    },
    {
      location_id: 3,
      description: "Severe weather warnings in the downtown area",
      safe_zones: "Emergency Medical Tent",
      street: "789 Central Ave",
      city: "Metropolis",
      state: "NY",
      zipcode: "10003",
      latitude: 40.713776,
      longitude: -74.006974,
      radius_miles: 3,
    },
  ]);

  // Weather Zones
  await knex("weather_zones").insert([
    {
      weather: "Heavy rain expected",
      location_id: 1,
      description: "Flood-prone zone near Main City Shelter",
      street: "123 Main St",
      city: "Metropolis",
      state: "NY",
      zipcode: "10001",
      latitude: 40.712776,
      longitude: -74.005974,
      radius_miles: 2,
    },
    {
      weather: "Clear skies",
      location_id: 2,
      description: "Bright sunny day at Community Food Bank",
      street: "456 Oak Ave",
      city: "Metropolis",
      state: "NY",
      zipcode: "10002",
      latitude: 40.713,
      longitude: -74.0065,
      radius_miles: 1,
    },
    {
      weather: "Partly cloudy",
      location_id: 4,
      description: "Mild weather with occasional showers",
      street: "321 Broadway",
      city: "Metropolis",
      state: "NY",
      zipcode: "10004",
      latitude: 40.714,
      longitude: -74.007,
      radius_miles: 2,
    },
  ]);

  // Reviews
  await knex("reviews").insert([
    {
      user_id: userIds[0],
      location_id: 1,
      content: "Very helpful staff and excellent services.",
      rating: 5,
      created_at: new Date("2023-01-01"),
    },
    {
      user_id: userIds[1],
      location_id: 2,
      content: "Excellent service at the food bank. Friendly and efficient.",
      rating: 4,
      created_at: new Date("2023-02-01"),
    },
    {
      user_id: userIds[2],
      location_id: 3,
      content:
        "The shelter was clean and well-organized with prompt assistance.",
      rating: 5,
      created_at: new Date("2023-03-01"),
    },
    {
      user_id: userIds[0],
      location_id: 4,
      content: "Food Hub provides a diverse range of nutritious options.",
      rating: 4,
      created_at: new Date("2023-03-15"),
    },
    {
      user_id: userIds[1],
      location_id: 5,
      content: "Suburban Family Shelter is a safe haven for families in need.",
      rating: 5,
      created_at: new Date("2023-04-01"),
    },
  ]);

  // Sessions
  await knex("sessions").insert([
    {
      user_id: userIds[0],
      expires_at: new Date("2024-01-01"),
    },
    {
      user_id: userIds[1],
      expires_at: new Date("2024-02-01"),
    },
  ]);

  // Search History
  await knex("search_history").insert([
    { user_id: userIds[0], search_query: "shelters near me" },
    { user_id: userIds[1], search_query: "food bank services" },
    { user_id: userIds[2], search_query: "emergency shelter" },
    { user_id: userIds[0], search_query: "downtown shelter" },
    { user_id: userIds[1], search_query: "blankets for shelter" },
  ]);
}

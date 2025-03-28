import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("weather_zones", (table) => {
    table.increments("weather_zone_id").primary();
    table
      .integer("location_id")
      .notNullable()
      .references("location_id")
      .inTable("locations");
    table.jsonb("weather_info");
    table.timestamp("last_updated").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("weather_zones");
}

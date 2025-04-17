import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("weather_zones", (table) => {
    table.inherits("high_risk_areas");
    table.text("weather");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("weather_zones");
}

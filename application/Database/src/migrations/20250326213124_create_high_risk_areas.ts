import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("high_risk_areas", (table) => {
    table.increments("area_id").primary();
    table
      .integer("location_id")
      .notNullable()
      .references("location_id")
      .inTable("locations");
    table.text("description");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("high_risk_areas");
}

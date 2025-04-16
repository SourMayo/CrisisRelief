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
    table.text("safe_zones");
    
    table.string("street");
    table.string("city");
    table.string("state",2);
    table.string("zipcode",20);
    
    table.float("latitude", 9,6);
    table.float("longitude", 9,6);
    table.integer("radius_miles");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("high_risk_areas");
}

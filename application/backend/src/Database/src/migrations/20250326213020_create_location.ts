import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("locations", (table) => {
    table.increments("location_id").primary();
    table.string("address").notNullable();
    table.string("type");
    table.string("name").notNullable();
    table.specificType("photos", "TEXT[]");
    table.text("description");
    table.boolean("is_high_risk").defaultTo(false);
    table.boolean("is_safe_zone").defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("locations");
}

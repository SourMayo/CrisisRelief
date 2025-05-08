import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("locations", (table) => {
    table.increments("location_id").primary();
    table.string("place_id", 255).unique();
    table.string("type");
    table.string("name").notNullable();
    table.text("description");
    table.string("open_hours");
    table.specificType("photos", "TEXT[]");
    table.string("url");

    table.timestamps(true, true);

    table.string("street").notNullable();
    table.string("city").notNullable();
    table.string("state", 2).notNullable();
    table.string("zipcode", 20).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("locations");
}

import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("reviews", (table) => {
    table.increments("review_id").primary();
    table.text("content").notNullable();
    table.integer("rating");
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table
      .integer("location_id")
      .notNullable()
      .references("location_id")
      .inTable("locations");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("reviews");
}

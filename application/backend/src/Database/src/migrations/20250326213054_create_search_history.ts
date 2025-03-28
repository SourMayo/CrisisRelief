import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("search_history", (table) => {
    table.increments("search_id").primary();
    table
      .integer("user_id")
      .notNullable()
      .references("user_id")
      .inTable("users");
    table.text("search_query").notNullable();
    table.timestamp("searched_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("search_history");
}

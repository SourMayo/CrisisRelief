import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("workers", (table) => {
    table.integer("worker_id").primary();
    table
      .integer("user_id")
      .notNullable()
      .unique()
      .references("user_id")
      .inTable("users");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("workers");
}

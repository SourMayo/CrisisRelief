import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("updates");
  if (!exists) {
    return knex.schema.createTable("updates", (table) => {
      table.increments("update_id").primary();
      table
        .integer("user_id")
        .notNullable()
        .references("user_id")
        .inTable("users");
      table.text("content").notNullable();
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  const exists = await knex.schema.hasTable("updates");
  if (exists) {
    return knex.schema.dropTable("updates");
  }
}

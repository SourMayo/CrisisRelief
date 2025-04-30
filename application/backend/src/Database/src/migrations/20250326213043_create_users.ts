import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary();
    table.string("first_name").notNullable();
    table.string("middle_name").notNullable();
    table.string("last_name").notNullable();
    table.string("username").unique();
    table.string("email").unique().notNullable();
    table.string("hashed_password").notNullable();
    table.string("phone_number");
    table.timestamps(true, true);
    table.timestamp("date_of_birth");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}

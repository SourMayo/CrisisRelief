import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", (table) => {
        table.increments("role_id").primary();
        table.text("Name");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}


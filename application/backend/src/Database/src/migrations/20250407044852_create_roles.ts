import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("roles", (table) => {
        table.integer("role_id").primary();
        table.integer("action_id").references("action_id").inTable("actions");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("roles");
}


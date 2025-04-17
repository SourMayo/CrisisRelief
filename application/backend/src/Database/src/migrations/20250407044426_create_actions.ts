import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("actions", (table) => {
        table.integer("action_id").primary();
        table.text("description");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("actions");
}


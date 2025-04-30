import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("permissions", (table) => {
        table
        .integer("role_id")
        .notNullable()
        .references("role_id")
        .inTable("roles");
      table
        .integer("action_id")
        .notNullable()
        .references("action_id")
        .inTable("actions");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("permissions");
}


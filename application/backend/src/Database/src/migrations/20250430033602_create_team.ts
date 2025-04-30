import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("team", (table) => {
        table
        .integer("manager")
        .notNullable()
        .references("worker_id")
        .inTable("workers");
        table
        .integer("worker")
        .notNullable()
        .references("worker_id")
        .inTable("workers");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("team");
}


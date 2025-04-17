import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("lodgings", (table) => {
        table.inherits("locations");
        table.integer("max_capacity");
        table.integer("current_capacity");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("lodgings");
}


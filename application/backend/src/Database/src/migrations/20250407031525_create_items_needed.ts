import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("items_needed", (table) => {
        table.string("name");
        table.integer("location_id").references("location_id").inTable("locations");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("items_needed");
}


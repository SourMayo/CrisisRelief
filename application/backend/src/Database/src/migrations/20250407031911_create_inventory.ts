import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("inventory", (table) => {
        table.string("name");
        table.integer("quantity");
        table.integer("location_id").references("location_id").inTable("locations");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("inventory");
}


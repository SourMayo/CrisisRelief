import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("beds", (table) => {
        table.integer("location_id").notNullable().references("location_id").inTable("locations");
        table.integer("max_capacity");
        table.integer("current_capacity");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("beds");
}


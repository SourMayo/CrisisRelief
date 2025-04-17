import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("saved_locations", (table) => {
        table.integer("user_id").references("user_id").inTable("users");
        table.integer("location_id").references("location_id").inTable("locations");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("saved_locations");
}


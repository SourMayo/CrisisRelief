import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("subscribed_locations", (table) => {
        table.increments("subscription_id").primary();
        table.integer("user_id").references("user_id").inTable("users");
        table.integer("location_id").references("location_id").inTable("locations");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("subscribed_locations");
}


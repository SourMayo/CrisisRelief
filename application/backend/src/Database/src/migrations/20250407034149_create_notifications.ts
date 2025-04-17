import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("notifications", (table) => {
        table.integer("notification_id").primary();
        table.integer("location_id").references("location_id").inTable("locations");
        table.text("message");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("notifications");
}


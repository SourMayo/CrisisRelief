import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("user_views", (table) => {
        table.integer("user_id").references("user_id").inTable("users");
        table.integer("location_id").references("location_id").inTable("locations");
        table.timestamp("viewed_at").defaultTo(knex.fn.now());
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("user_views");
}


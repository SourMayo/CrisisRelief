import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("workers", (table) => {
        table.increments("worker_id").primary();
        table.integer("user_id").references("user_id").inTable("users");
        table.integer("location_id").references("location_id").inTable("locations");
        table.integer("role_id").references("role_id").inTable("roles");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("workers");
}


import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("workers", (table) => {
        table.increments("worker_id").primary();
        table
          .integer("user_id")
          .notNullable()
          .references("user_id")
          .inTable("users");
        table
          .integer("location_id")
          .notNullable()
          .references("location_id")
          .inTable("locations");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
        .integer("role_id")
        .notNullable()
        .references("role_id")
        .inTable("roles");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("workers");
}


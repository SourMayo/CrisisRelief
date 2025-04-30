import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("messages", (table) => {
        table.increments("message_id").primary();
        table
          .integer("worker_id")
          .notNullable()
          .references("worker_id")
          .inTable("workers");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.text("content");
      });
    
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("messages");
}


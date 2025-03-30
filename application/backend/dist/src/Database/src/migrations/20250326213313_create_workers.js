"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("workers", (table) => {
        table.integer("worker_id").primary();
        table
            .integer("user_id")
            .notNullable()
            .unique()
            .references("user_id")
            .inTable("users");
    });
}
async function down(knex) {
    return knex.schema.dropTable("workers");
}

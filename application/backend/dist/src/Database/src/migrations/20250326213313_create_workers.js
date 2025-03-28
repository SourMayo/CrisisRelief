"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
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
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("workers");
}
exports.down = down;

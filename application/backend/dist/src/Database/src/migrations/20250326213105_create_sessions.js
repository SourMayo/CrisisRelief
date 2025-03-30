"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("sessions", (table) => {
        table.increments("session_id").primary();
        table
            .integer("user_id")
            .notNullable()
            .references("user_id")
            .inTable("users");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("expires_at").notNullable();
    });
}
async function down(knex) {
    return knex.schema.dropTable("sessions");
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("search_history", (table) => {
        table.increments("search_id").primary();
        table
            .integer("user_id")
            .notNullable()
            .references("user_id")
            .inTable("users");
        table.text("search_query").notNullable();
        table.timestamp("searched_at").defaultTo(knex.fn.now());
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("search_history");
}
exports.down = down;

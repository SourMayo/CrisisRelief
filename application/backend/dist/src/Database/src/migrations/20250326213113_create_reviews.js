"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("reviews", (table) => {
        table.increments("review_id").primary();
        table.text("content").notNullable();
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
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("reviews");
}
exports.down = down;

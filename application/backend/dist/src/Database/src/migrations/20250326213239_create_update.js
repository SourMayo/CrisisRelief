"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    const exists = await knex.schema.hasTable("updates");
    if (!exists) {
        return knex.schema.createTable("updates", (table) => {
            table.increments("update_id").primary();
            table
                .integer("user_id")
                .notNullable()
                .references("user_id")
                .inTable("users");
            table.text("content").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
        });
    }
}
exports.up = up;
async function down(knex) {
    const exists = await knex.schema.hasTable("updates");
    if (exists) {
        return knex.schema.dropTable("updates");
    }
}
exports.down = down;

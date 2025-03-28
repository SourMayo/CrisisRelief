"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("food_banks", (table) => {
        table.increments("food_bank_id").primary();
        table
            .integer("location_id")
            .notNullable()
            .references("location_id")
            .inTable("locations");
        table.integer("max_capacity").notNullable();
        table.integer("current_capacity").notNullable();
        table.jsonb("inventory");
        // Generated column syntax varies by DB - this is PostgreSQL specific
        knex.raw("ALTER TABLE food_banks ADD COLUMN shortage BOOLEAN GENERATED ALWAYS AS (current_capacity < max_capacity) STORED");
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable("food_banks");
}
exports.down = down;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("locations", (table) => {
        table.increments("location_id").primary();
        table.string("address").notNullable();
        table.string("type");
        table.string("name").notNullable();
        table.specificType("photos", "TEXT[]");
        table.text("description");
        table.boolean("is_high_risk").defaultTo(false);
        table.boolean("is_safe_zone").defaultTo(false);
    });
}
async function down(knex) {
    return knex.schema.dropTable("locations");
}

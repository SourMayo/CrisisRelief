"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("high_risk_areas", (table) => {
        table.increments("area_id").primary();
        table
            .integer("location_id")
            .notNullable()
            .references("location_id")
            .inTable("locations");
        table.text("description");
    });
}
async function down(knex) {
    return knex.schema.dropTable("high_risk_areas");
}

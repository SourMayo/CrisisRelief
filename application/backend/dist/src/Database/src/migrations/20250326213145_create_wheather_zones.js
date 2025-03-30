"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("weather_zones", (table) => {
        table.increments("weather_zone_id").primary();
        table
            .integer("location_id")
            .notNullable()
            .references("location_id")
            .inTable("locations");
        table.jsonb("weather_info");
        table.timestamp("last_updated").defaultTo(knex.fn.now());
    });
}
async function down(knex) {
    return knex.schema.dropTable("weather_zones");
}

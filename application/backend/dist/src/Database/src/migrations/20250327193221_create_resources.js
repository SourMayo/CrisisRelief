"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable("resources", (table) => {
        table.increments("resource_id").primary();
        table.string("name", 50).notNullable();
        table.specificType("type", "resourceTypes").notNullable();
        table.string("address", 100).notNullable();
        table.string("city", 100).notNullable();
        table.string("state", 25).notNullable();
        table.string("zip_code", 10).notNullable();
        table.decimal("latitude", 9, 6).notNullable();
        table.decimal("longitude", 9, 6).notNullable();
        table.string("open_hours", 100).notNullable();
        table.specificType("status", "resourceStatuses").notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTableIfExists("resources");
    return knex.schema.raw(`
        DROP TYPE IF EXISTS resourceTypes;
        DROP TYPE IF EXISTS resourceStatuses;
    `);
}
exports.down = down;

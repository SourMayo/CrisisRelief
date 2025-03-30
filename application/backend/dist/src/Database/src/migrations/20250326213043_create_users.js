"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("user_id").primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("username").unique();
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
        table.string("phone_number");
        table.timestamps(true, true);
        table.boolean("isa").defaultTo(false);
        table.integer("location_id").references("location_id").inTable("locations");
    });
}
async function down(knex) {
    return knex.schema.dropTable("users");
}

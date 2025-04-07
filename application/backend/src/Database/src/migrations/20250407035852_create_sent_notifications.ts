import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("sent_notifications", (table) => {
        table.integer("user_id").references("user_id").inTable("users");
        table.integer("notification_id").references("notification_id").inTable("notifications");
        table.boolean("is_read");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("sent_notifications");
}


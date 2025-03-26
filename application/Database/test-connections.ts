import knex from "knex";
import config from "./knexfile";

const db = knex(config.development); // Use the "development" environment

async function test() {
  try {
    await db.raw("SELECT 1");
    console.log("Connection successful!");
  } catch (error) {
    console.error(" Connection failed:", error);
  } finally {
    await db.destroy();
  }
}

test();

// knexfile.ts
import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      "postgresql://postgres:password@localhost:5432/postgres",
    migrations: {
      directory: "./src/migrations",
      extension: "ts",
    },
    seeds: {
      directory: "./src/seeds",
      extension: "ts",
    },
  },
};

export default config;

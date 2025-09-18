import { neon } from "@neondatabase/serverless";

import "dotenv/config";

export const sql = neon(process.env.DATABASE_URL!);

export const initDb = async () => {
  try {
    const create_transaction_table =
      await sql`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      user_id VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      category VARCHAR(255) NOT NULL,
      created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;
    console.log("Database initialized");
  } catch (error) {
    console.log("Error initializing DB", error.message);
    process.exit(1);
  }
};

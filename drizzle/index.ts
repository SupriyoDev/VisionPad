import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString:
    "postgresql://6h4dal:xau_sr3fGhmlseeFsYKs6kzeZ4HwOalCuAq51@us-east-1.sql.xata.sh/visionpad:main?sslmode=require",
});
export const db = drizzle(pool);

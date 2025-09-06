import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://6h4dal:xau_sr3fGhmlseeFsYKs6kzeZ4HwOalCuAq51@us-east-1.sql.xata.sh/visionpad:main?sslmode=require",
  },
});

import { DataSource } from "typeorm";
import "reflect-metadata";
require("dotenv").config();

const currentProcess = process.env.NODE_ENV;
const host = currentProcess === "migration" ? "localhost" : "db_health";

const AppDataSource =
  currentProcess === "test"
    ? new DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.entity.ts"],
        synchronize: true,
      })
    : new DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        synchronize: false,
        entities: process.env.NODE_ENV === "production" ? ["build/src/entities/*.js"] : ["src/entities/*.ts"],
        migrations: process.env.NODE_ENV === "production" ? ["build/src/migrations/*.js"] : ["src/migrations/*.ts"],
        subscribers: [],
      });

export default AppDataSource;

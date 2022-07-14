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
        host,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB,
        synchronize: false,
        entities: ["src/entities/*.entity.ts"],
        migrations: ["src/migrations/*.ts"],
        subscribers: [],
      });
export default AppDataSource;

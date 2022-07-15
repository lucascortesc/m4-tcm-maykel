"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
require("reflect-metadata");
require("dotenv").config();
const currentProcess = process.env.NODE_ENV;
const host = currentProcess === "migration" ? "localhost" : "db_health";
const AppDataSource = currentProcess === "test"
    ? new typeorm_1.DataSource({
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/*.entity.ts"],
        synchronize: true,
    })
    : new typeorm_1.DataSource({
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
        synchronize: false,
        entities: process.env.NODE_ENV === "production" ? ["build/src/entities/*.js"] : ["src/entities/*.ts"],
        migrations: process.env.NODE_ENV === "production" ? ["build/src/migrations/*.js"] : ["src/migrations/*.ts"],
        subscribers: [],
    });
exports.default = AppDataSource;
//# sourceMappingURL=data-source.js.map
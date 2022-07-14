import express from "express";
import "express-async-errors";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import agentRoutes from "./routes/healthAgent.routes";

const app = express();
app.use(express.json());
app.use("", agentRoutes);
app.use(handleAppErrorMiddleware);

export default app;

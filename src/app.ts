import express from "express";
import "express-async-errors";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import addressRoutes from "./routes/address.routes";
import familyRoutes from "./routes/family.routes";
import agentRoutes from "./routes/healthAgent.routes";
import { pacientRoutes } from "./routes/pacient.routes";

const app = express();
app.use(express.json());

app.use("", agentRoutes);
app.use("/family", familyRoutes);
app.use("/address", addressRoutes);
app.use("/pacient", pacientRoutes);

app.use(handleAppErrorMiddleware);

export default app;

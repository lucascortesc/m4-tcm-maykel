import express from "express";
import "express-async-errors";
import { handleAppErrorMiddleware } from "./middlewares/handleAppError.middleware";
import addressRoutes from "./routes/address.routes";
import familyRoutes from "./routes/family.routes";
import agentRoutes from "./routes/healthAgent.routes";
import homeVisitRoutes from "./routes/homeVisit.routes";
import { pacientRoutes } from "./routes/pacient.routes";

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("", agentRoutes);
app.use("/family", familyRoutes);
app.use("/address", addressRoutes);
app.use("/visits", homeVisitRoutes);
app.use("/pacient", pacientRoutes);
app.use(handleAppErrorMiddleware);

export default app;

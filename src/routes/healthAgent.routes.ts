import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import createHealthAgentController from "../controllers/healthAgent/createHealthAgent.controller";
import listHealthAgentController from "../controllers/healthAgent/listHealthAgent.controller";
import loginHealthAgentController from "../controllers/healthAgent/loginHealthAgent.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { agentSchema } from "../validation";

const agentRoutes = Router();

agentRoutes.post(
  "/register",
  expressYupMiddleware({ schemaValidator: agentSchema }),
  createHealthAgentController
);
agentRoutes.get("/agent", authorization, listHealthAgentController);
agentRoutes.post("/login", loginHealthAgentController);

export default agentRoutes;

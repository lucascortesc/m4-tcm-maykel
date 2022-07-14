import { Router } from "express";
import createHealthAgentController from "../controllers/healthAgent/createHealthAgent.controller";
import listHealthAgentController from "../controllers/healthAgent/listHealthAgent.controller";
import loginHealthAgentController from "../controllers/healthAgent/loginHealthAgent.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { agentSchema } from "../validation";

const agentRoutes = Router();

agentRoutes.post("/register", schemaValidation(agentSchema), createHealthAgentController);
agentRoutes.get("/agent", authorization, listHealthAgentController);
agentRoutes.post("/login", loginHealthAgentController);

export default agentRoutes;

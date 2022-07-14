import { Router } from "express";
import createHealthAgentController from "../controllers/healthAgent/createHealthAgent.controller";
import deleteHealthAgentController from "../controllers/healthAgent/deleteHealthAgent.contoller";
import listHealthAgentController from "../controllers/healthAgent/listHealthAgent.controller";
import loginHealthAgentController from "../controllers/healthAgent/loginHealthAgent.controller";
import updateHealthAgentController from "../controllers/healthAgent/updateHealthAgent.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { agentSchema, updateAgentSchema } from "../validation";

const agentRoutes = Router();

agentRoutes.post("/register", schemaValidation(agentSchema), createHealthAgentController);
agentRoutes.get("/agent", authorization, listHealthAgentController);
agentRoutes.post("/login", loginHealthAgentController);
agentRoutes.delete("/agent", authorization, deleteHealthAgentController);
agentRoutes.patch("/agent", authorization, schemaValidation(updateAgentSchema), updateHealthAgentController);

export default agentRoutes;

import { Router } from "express";
import createHealthAgentController from "../controllers/healthAgent/createHealthAgent.controller";
import listHealthAgentController from "../controllers/healthAgent/listHealthAgent.controller";

const agentRoutes = Router();

agentRoutes.post("/register", createHealthAgentController);
agentRoutes.get("/agent/:id", listHealthAgentController);

export default agentRoutes;

import { Router } from "express";
import { activateHealthAgentTokenController } from "../controllers/healthAgent/activateHealthAgentToken.controller";
import { activateHealthAgentController } from "../controllers/healthAgent/activateHeathAgent.controller";
import createHealthAgentController from "../controllers/healthAgent/createHealthAgent.controller";
import deleteHealthAgentController from "../controllers/healthAgent/deleteHealthAgent.contoller";
import listHealthAgentController from "../controllers/healthAgent/listHealthAgent.controller";
import loginHealthAgentController from "../controllers/healthAgent/loginHealthAgent.controller";
import updateHealthAgentController from "../controllers/healthAgent/updateHealthAgent.controller";
import { resetPasswordController } from "../controllers/resetPassword/resetPassword.controller";
import { sendResetPasswordController } from "../controllers/resetPassword/sendResetPassword.controllers";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { userIsActive } from "../middlewares/userIsActive.middleware";
import { agentSchema, updateAgentSchema } from "../validation";

const agentRoutes = Router();

agentRoutes.post("/register", schemaValidation(agentSchema), createHealthAgentController);
agentRoutes.get("/agent", authorization, userIsActive, listHealthAgentController);
agentRoutes.post("/login", loginHealthAgentController);
agentRoutes.delete("/agent", authorization, userIsActive, deleteHealthAgentController);
agentRoutes.patch(
  "/agent",
  authorization,
  userIsActive,
  schemaValidation(updateAgentSchema),
  updateHealthAgentController
);
agentRoutes.patch("/agent/activate", authorization, activateHealthAgentController);
agentRoutes.post("/agent/password", sendResetPasswordController);
agentRoutes.patch("/agent/password/:token", schemaValidation(updateAgentSchema), resetPasswordController);

agentRoutes.get("/agent/activate/:activateToken", activateHealthAgentTokenController);

export default agentRoutes;

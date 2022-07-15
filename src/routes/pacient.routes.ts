import { Router } from "express";
import { createPacient } from "../controllers/pacient/createPacient.controller";
import { listPacientByAgent } from "../controllers/pacient/listPacientByAgent.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { pacientSchema } from "../validation";

export const pacientRoutes = Router();

pacientRoutes.post("", schemaValidation(pacientSchema), authorization, createPacient);
pacientRoutes.get("", authorization, listPacientByAgent);

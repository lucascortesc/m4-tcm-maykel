import { Router } from "express";
import { createPacient } from "../controllers/pacient/createPacient.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { pacientSchema } from "../validation";

export const pacientRoutes = Router();

pacientRoutes.post("", schemaValidation(pacientSchema), authorization, createPacient);

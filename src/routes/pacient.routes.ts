import { Router } from "express";
import { createPacient } from "../controllers/pacient/createPacient.controller";
import { listOnePatientController } from "../controllers/pacient/listOnePacient.controller";
import { listPacientByAgent } from "../controllers/pacient/listPacientByAgent.controller";
import { updatePacient } from "../controllers/pacient/updatePacient.controller";
import { deletePacientController } from "../controllers/pacient/deletePacient.controller"
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { pacientSchema } from "../validation";

export const pacientRoutes = Router();

pacientRoutes.post(
  "",
  schemaValidation(pacientSchema),
  authorization,
  createPacient
);
pacientRoutes.patch("/:id", authorization, updatePacient);
pacientRoutes.get("", authorization, listPacientByAgent);
pacientRoutes.get("/:id", authorization, listOnePatientController);
pacientRoutes.delete("/:id", authorization, deletePacientController)
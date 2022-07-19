import { Router } from "express";
import { createPacient } from "../controllers/pacient/createPacient.controller";
import { listOnePatientController } from "../controllers/pacient/listOnePacient.controller";
import { listPacientByAgent } from "../controllers/pacient/listPacientByAgent.controller";
import { updatePacient } from "../controllers/pacient/updatePacient.controller";
import { deletePacientController } from "../controllers/pacient/deletePacient.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { pacientSchema } from "../validation";
import { userIsActive } from "../middlewares/userIsActive.middleware";

export const pacientRoutes = Router();

pacientRoutes.post("", authorization, userIsActive, schemaValidation(pacientSchema), createPacient);
pacientRoutes.patch("/:id", authorization, userIsActive, updatePacient);
pacientRoutes.get("", authorization, userIsActive, listPacientByAgent);
pacientRoutes.get("/:id", authorization, userIsActive, listOnePatientController);
pacientRoutes.delete("/:id", authorization, userIsActive, deletePacientController);

import { Router } from "express";
import { createFamilyController } from "../controllers/family/createFamily.controllers";
import deleteFamilyController from "../controllers/family/deleteFamily.controller";
import { listAllFamiliesControler } from "../controllers/family/listAllFamilies.controller";
import { listAllPacientsFromFamily } from "../controllers/family/listAllPacientsFromFamily.controller";
import listOneFamilyController from "../controllers/family/listOneFamily.controller";
import updateFamilyController from "../controllers/family/updateFamily.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { userIsActive } from "../middlewares/userIsActive.middleware";
import { familySchema, updateFamilySchema } from "../validation";

const familyRoutes = Router();

familyRoutes.post("", authorization, userIsActive, schemaValidation(familySchema), createFamilyController);
familyRoutes.delete("/:id", authorization, userIsActive, deleteFamilyController);
familyRoutes.get("/:id", authorization, userIsActive, listOneFamilyController);
familyRoutes.get("", authorization, userIsActive, listAllFamiliesControler);
familyRoutes.get("/:id/pacients", authorization, userIsActive, listAllPacientsFromFamily);
familyRoutes.patch("/:id", authorization, userIsActive, schemaValidation(updateFamilySchema), updateFamilyController);

export default familyRoutes;

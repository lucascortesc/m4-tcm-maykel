import { Router } from "express";
import { createFamilyController } from "../controllers/family/createFamily.controllers";

import deleteFamilyController from "../controllers/family/deleteFamily.controller";
import { listAllFamiliesControler } from "../controllers/family/listAllFamilies.controller";
import listOneFamilyController from "../controllers/family/listOneFamily.controller";
import updateFamilyController from "../controllers/family/updateFamily.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { userIsActive } from "../middlewares/userIsActive.middleware";
import { familySchema } from "../validation";

const familyRoutes = Router();

familyRoutes.post("", authorization, userIsActive, schemaValidation(familySchema), createFamilyController);
familyRoutes.delete("/:id", authorization, userIsActive, deleteFamilyController);
familyRoutes.get("/:id", authorization, userIsActive, listOneFamilyController);
familyRoutes.patch("/:id", authorization, userIsActive, updateFamilyController);
familyRoutes.get("", authorization, userIsActive, listAllFamiliesControler);

export default familyRoutes;

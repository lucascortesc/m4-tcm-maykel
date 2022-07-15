import { Router } from "express";
import { createFamilyController } from "../controllers/family/createFamily.controllers";

import deleteFamilyController from "../controllers/family/deleteFamily.controller";
import { listAllFamiliesControler } from "../controllers/family/listAllFamilies.controller";
import listOneFamilyController from "../controllers/family/listOneFamily.controller";
import updateFamilyController from "../controllers/family/updateFamily.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import verifyFamily from "../middlewares/verifyFamily.middleware";

const familyRoutes = Router();

familyRoutes.post("", authorization, createFamilyController);
familyRoutes.delete("/:id", authorization, deleteFamilyController);
familyRoutes.get("/:id", authorization, listOneFamilyController);
familyRoutes.patch("/:id", authorization, updateFamilyController);
familyRoutes.get("", authorization, listAllFamiliesControler);

export default familyRoutes;

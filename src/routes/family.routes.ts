import { Router } from "express";
import deleteFamilyController from "../controllers/family/deleteFamily.controller";
import { listAllFamiliesControler } from "../controllers/family/listAllFamilies.controller";
import listOneFamilyController from "../controllers/family/listOneFamily.controller"
import { authorization } from "../middlewares/Authorization.middleware";
import verifyFamily from "../middlewares/verifyFamily.middleware";

const familyRoutes = Router();

familyRoutes.delete(
  "/:id",
  authorization,
  verifyFamily,
  deleteFamilyController
);
familyRoutes.get(
  "/:id",
  authorization,
  verifyFamily,
  listOneFamilyController
);

familyRoutes.get(
  "",
  authorization,
  verifyFamily,
  listAllFamiliesControler
);

export default familyRoutes;

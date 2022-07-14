import { Router } from "express";
import deleteFamilyController from "../controllers/family/deleteFamily.controller";
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

export default familyRoutes;

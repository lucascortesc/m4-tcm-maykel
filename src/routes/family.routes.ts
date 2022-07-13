import { Router } from "express";
import deleteFamilyController from "../controllers/family/deleteFamily.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import verifyFamily from "../middlewares/verifyFamily.middleware";

const familyRoutes = Router();

familyRoutes.delete(
  "/:id",
  authorization,
  verifyFamily,
  deleteFamilyController
);

export default familyRoutes;

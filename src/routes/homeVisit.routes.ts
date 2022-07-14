import { Router } from "express";
import updateHomeVisitController from "../controllers/homeVisit/updateHomeVisit.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import verifyHomeVisit from "../middlewares/verifyHomeVisit.middleware";

const homeVisitRoutes = Router();

homeVisitRoutes.patch(
  "/:id",
  authorization,
  verifyHomeVisit,
  updateHomeVisitController
);

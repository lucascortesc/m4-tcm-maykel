import { Router } from "express";
import { listHomeVisitsController } from "../controllers/homeVisit/listHomeVisits.controller";
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

homeVisitRoutes.get(" ", authorization, listHomeVisitsController);

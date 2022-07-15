import { Router } from "express";
import { listHomeVisitsController } from "../controllers/homeVisit/listHomeVisits.controller";
import { createHomeVisitController } from "../controllers/homeVisit/createHomeVisit.controller";
import updateHomeVisitController from "../controllers/homeVisit/updateHomeVisit.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import verifyHomeVisit from "../middlewares/verifyHomeVisit.middleware";
import { visitsSchema } from "../validation";

const homeVisitRoutes = Router();

homeVisitRoutes.post(
  "",
  schemaValidation(visitsSchema),
  authorization,
  createHomeVisitController
);
homeVisitRoutes.patch(
  "/:id",
  authorization,
  verifyHomeVisit,
  updateHomeVisitController
);

homeVisitRoutes.get("", authorization, listHomeVisitsController);

export default homeVisitRoutes;

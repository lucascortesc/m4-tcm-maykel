import { Router } from "express";
import { createHomeVisitController } from "../controllers/homeVisit/createHomeVisit.controller";
import { listOneVisitController } from "../controllers/homeVisit/listOneVisit.controller";
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

homeVisitRoutes.get("/:id", authorization, listOneVisitController)

export default homeVisitRoutes

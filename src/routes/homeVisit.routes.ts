import { Router } from "express";
import { listHomeVisitsController } from "../controllers/homeVisit/listHomeVisits.controller";
import { createHomeVisitController } from "../controllers/homeVisit/createHomeVisit.controller";
import { listOneVisitController } from "../controllers/homeVisit/listOneVisit.controller";
import updateHomeVisitController from "../controllers/homeVisit/updateHomeVisit.controller";
import deleteHomeVisitController from "../controllers/homeVisit/deleteHomeVisit.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import verifyHomeVisit from "../middlewares/verifyHomeVisit.middleware";
import { updateVisitsSchema, visitsSchema } from "../validation";
import { userIsActive } from "../middlewares/userIsActive.middleware";

const homeVisitRoutes = Router();

homeVisitRoutes.post("", authorization, userIsActive, schemaValidation(visitsSchema), createHomeVisitController);
homeVisitRoutes.patch("/:id", authorization, userIsActive, schemaValidation(updateVisitsSchema), verifyHomeVisit, updateHomeVisitController);
homeVisitRoutes.delete("/:id", authorization, userIsActive, verifyHomeVisit, deleteHomeVisitController);
homeVisitRoutes.get("", authorization, userIsActive, listHomeVisitsController);
homeVisitRoutes.get("/:id", authorization, userIsActive, listOneVisitController);

export default homeVisitRoutes;

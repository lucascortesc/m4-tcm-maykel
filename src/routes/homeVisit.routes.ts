import { Router } from "express";
import updateHomeVisitController from "../controllers/homeVisit/updateHomeVisit.controller";
import deleteHomeVisitController from "../controllers/homeVisit/deleteHomeVisit.controller"
import { authorization } from "../middlewares/Authorization.middleware";
import verifyHomeVisit from "../middlewares/verifyHomeVisit.middleware";

const homeVisitRoutes = Router();

homeVisitRoutes.patch(
  "/:id",
  authorization,
  verifyHomeVisit,
  updateHomeVisitController
);
homeVisitRoutes.delete(
  "/:id",
  authorization,
  verifyHomeVisit,
  deleteHomeVisitController
)

export default homeVisitRoutes
import { Router } from "express";
import { createFamilyController } from "../controllers/family/createFamily.controllers";

import deleteFamilyController from "../controllers/family/deleteFamily.controller";
<<<<<<< HEAD
import { listAllFamiliesControler } from "../controllers/family/listAllFamilies.controller";
import listOneFamilyController from "../controllers/family/listOneFamily.controller"
=======
import listOneFamilyController from "../controllers/family/listOneFamily.controller";
>>>>>>> 8f2a74fa935acfe47df8d5399a3a6669f2233a27
import updateFamilyController from "../controllers/family/updateFamily.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import verifyFamily from "../middlewares/verifyFamily.middleware";

const familyRoutes = Router();

familyRoutes.post("", authorization, createFamilyController);

familyRoutes.delete("/:id", authorization, verifyFamily, deleteFamilyController);
familyRoutes.get("/:id", authorization, verifyFamily, listOneFamilyController);
familyRoutes.patch("/:id", authorization, verifyFamily, updateFamilyController);

familyRoutes.get(
  "",
  authorization,
  verifyFamily,
  listAllFamiliesControler
);

export default familyRoutes;

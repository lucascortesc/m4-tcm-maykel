import { Router } from "express";
import { expressYupMiddleware } from "express-yup-middleware";
import { createFamilyController } from "../controllers/family/createFamily.controllers";

const familyRoutes = Router();

// familyRoutes.post("/", expressYupMiddleware)

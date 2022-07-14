import { Router } from "express";
import { createAddress } from "../controllers/adress/createAddress.controller";
import { listAddress } from "../controllers/adress/listAddress.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import verifyAddress from "../middlewares/verifyAddress.middleware";
import { addressSchema } from "../validation";

const addressRoutes = Router();

addressRoutes.post("", schemaValidation(addressSchema), authorization, createAddress);
addressRoutes.get("/:id", listAddress);

export default addressRoutes;

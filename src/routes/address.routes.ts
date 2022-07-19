import { Router } from "express";
import { createAddress } from "../controllers/address/createAddress.controller";
import { deleteAddressController } from "../controllers/address/deleteAddress.controller";
import { listAddress } from "../controllers/address/listAddress.controller";
import { listAddressByAgentController } from "../controllers/address/listAddressByAgent.controller";
import { listAllVisitsFromAddress } from "../controllers/address/listAllVisitsFromAddress.controller";
import { updateAddressController } from "../controllers/address/updateAddress.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import { userIsActive } from "../middlewares/userIsActive.middleware";
import { addressSchema, updateAddressSchema } from "../validation";

const addressRoutes = Router();

addressRoutes.post("", authorization, userIsActive, schemaValidation(addressSchema), createAddress);
addressRoutes.get("/:id", authorization, userIsActive, listAddress);
addressRoutes.get("", authorization, userIsActive, listAddressByAgentController);
addressRoutes.get("/:id/visits", authorization, userIsActive, listAllVisitsFromAddress);
addressRoutes.delete("/:id", authorization, userIsActive, deleteAddressController);
addressRoutes.patch(
  "/:id",
  authorization,
  userIsActive,
  schemaValidation(updateAddressSchema),
  updateAddressController
);

export default addressRoutes;

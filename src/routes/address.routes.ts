import { Router } from "express";
import { createAddress } from "../controllers/address/createAddress.controller";
import { deleteAddressController } from "../controllers/address/deleteAddress.controller";
import { listAddress } from "../controllers/address/listAddress.controller";
import { listAddressByAgentController } from "../controllers/address/listAddressByAgent.controller";
import { authorization } from "../middlewares/Authorization.middleware";
import { schemaValidation } from "../middlewares/schemaValidation.middleware";
import verifyAddress from "../middlewares/verifyAddress.middleware";
import { addressSchema } from "../validation";

const addressRoutes = Router();

addressRoutes.post(
  "",
  schemaValidation(addressSchema),
  authorization,
  createAddress
);
addressRoutes.get("/:id", listAddress);
addressRoutes.get("", authorization, listAddressByAgentController);
addressRoutes.delete("/:id", authorization, deleteAddressController);

export default addressRoutes;

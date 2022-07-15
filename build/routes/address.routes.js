"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAddress_controller_1 = require("../controllers/address/createAddress.controller");
const deleteAddress_controller_1 = require("../controllers/address/deleteAddress.controller");
const listAddress_controller_1 = require("../controllers/address/listAddress.controller");
const listAddressByAgent_controller_1 = require("../controllers/address/listAddressByAgent.controller");
const updateAddress_controller_1 = require("../controllers/address/updateAddress.controller");
const Authorization_middleware_1 = require("../middlewares/Authorization.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const validation_1 = require("../validation");
const addressRoutes = (0, express_1.Router)();
addressRoutes.post("", (0, schemaValidation_middleware_1.schemaValidation)(validation_1.addressSchema), Authorization_middleware_1.authorization, createAddress_controller_1.createAddress);
addressRoutes.get("/:id", Authorization_middleware_1.authorization, listAddress_controller_1.listAddress);
addressRoutes.get("", Authorization_middleware_1.authorization, listAddressByAgent_controller_1.listAddressByAgentController);
addressRoutes.delete("/:id", Authorization_middleware_1.authorization, deleteAddress_controller_1.deleteAddressController);
addressRoutes.patch("/:id", Authorization_middleware_1.authorization, updateAddress_controller_1.updateAddressController);
exports.default = addressRoutes;
//# sourceMappingURL=address.routes.js.map
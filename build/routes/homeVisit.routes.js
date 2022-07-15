"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const listHomeVisits_controller_1 = require("../controllers/homeVisit/listHomeVisits.controller");
const createHomeVisit_controller_1 = require("../controllers/homeVisit/createHomeVisit.controller");
const listOneVisit_controller_1 = require("../controllers/homeVisit/listOneVisit.controller");
const updateHomeVisit_controller_1 = __importDefault(require("../controllers/homeVisit/updateHomeVisit.controller"));
const deleteHomeVisit_controller_1 = __importDefault(require("../controllers/homeVisit/deleteHomeVisit.controller"));
const Authorization_middleware_1 = require("../middlewares/Authorization.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const verifyHomeVisit_middleware_1 = __importDefault(require("../middlewares/verifyHomeVisit.middleware"));
const validation_1 = require("../validation");
const homeVisitRoutes = (0, express_1.Router)();
homeVisitRoutes.post("", (0, schemaValidation_middleware_1.schemaValidation)(validation_1.visitsSchema), Authorization_middleware_1.authorization, createHomeVisit_controller_1.createHomeVisitController);
homeVisitRoutes.patch("/:id", Authorization_middleware_1.authorization, verifyHomeVisit_middleware_1.default, updateHomeVisit_controller_1.default);
homeVisitRoutes.delete("/:id", Authorization_middleware_1.authorization, verifyHomeVisit_middleware_1.default, deleteHomeVisit_controller_1.default);
homeVisitRoutes.get("", Authorization_middleware_1.authorization, listHomeVisits_controller_1.listHomeVisitsController);
homeVisitRoutes.get("/:id", Authorization_middleware_1.authorization, listOneVisit_controller_1.listOneVisitController);
exports.default = homeVisitRoutes;
//# sourceMappingURL=homeVisit.routes.js.map
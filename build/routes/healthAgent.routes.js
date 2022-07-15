"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createHealthAgent_controller_1 = __importDefault(require("../controllers/healthAgent/createHealthAgent.controller"));
const deleteHealthAgent_contoller_1 = __importDefault(require("../controllers/healthAgent/deleteHealthAgent.contoller"));
const listHealthAgent_controller_1 = __importDefault(require("../controllers/healthAgent/listHealthAgent.controller"));
const loginHealthAgent_controller_1 = __importDefault(require("../controllers/healthAgent/loginHealthAgent.controller"));
const updateHealthAgent_controller_1 = __importDefault(require("../controllers/healthAgent/updateHealthAgent.controller"));
const Authorization_middleware_1 = require("../middlewares/Authorization.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const validation_1 = require("../validation");
const agentRoutes = (0, express_1.Router)();
agentRoutes.post("/register", (0, schemaValidation_middleware_1.schemaValidation)(validation_1.agentSchema), createHealthAgent_controller_1.default);
agentRoutes.get("/agent", Authorization_middleware_1.authorization, listHealthAgent_controller_1.default);
agentRoutes.post("/login", loginHealthAgent_controller_1.default);
agentRoutes.delete("/agent", Authorization_middleware_1.authorization, deleteHealthAgent_contoller_1.default);
agentRoutes.patch("/agent", Authorization_middleware_1.authorization, (0, schemaValidation_middleware_1.schemaValidation)(validation_1.updateAgentSchema), updateHealthAgent_controller_1.default);
exports.default = agentRoutes;
//# sourceMappingURL=healthAgent.routes.js.map
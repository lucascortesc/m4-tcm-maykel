"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pacientRoutes = void 0;
const express_1 = require("express");
const createPacient_controller_1 = require("../controllers/pacient/createPacient.controller");
const listOnePacient_controller_1 = require("../controllers/pacient/listOnePacient.controller");
const listPacientByAgent_controller_1 = require("../controllers/pacient/listPacientByAgent.controller");
const updatePacient_controller_1 = require("../controllers/pacient/updatePacient.controller");
const deletePacient_controller_1 = require("../controllers/pacient/deletePacient.controller");
const Authorization_middleware_1 = require("../middlewares/Authorization.middleware");
const schemaValidation_middleware_1 = require("../middlewares/schemaValidation.middleware");
const validation_1 = require("../validation");
exports.pacientRoutes = (0, express_1.Router)();
exports.pacientRoutes.post("", (0, schemaValidation_middleware_1.schemaValidation)(validation_1.pacientSchema), Authorization_middleware_1.authorization, createPacient_controller_1.createPacient);
exports.pacientRoutes.patch("/:id", Authorization_middleware_1.authorization, updatePacient_controller_1.updatePacient);
exports.pacientRoutes.get("", Authorization_middleware_1.authorization, listPacientByAgent_controller_1.listPacientByAgent);
exports.pacientRoutes.get("/:id", Authorization_middleware_1.authorization, listOnePacient_controller_1.listOnePatientController);
exports.pacientRoutes.delete("/:id", Authorization_middleware_1.authorization, deletePacient_controller_1.deletePacientController);
//# sourceMappingURL=pacient.routes.js.map
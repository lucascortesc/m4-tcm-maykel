"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createFamily_controllers_1 = require("../controllers/family/createFamily.controllers");
const deleteFamily_controller_1 = __importDefault(require("../controllers/family/deleteFamily.controller"));
const listAllFamilies_controller_1 = require("../controllers/family/listAllFamilies.controller");
const listOneFamily_controller_1 = __importDefault(require("../controllers/family/listOneFamily.controller"));
const updateFamily_controller_1 = __importDefault(require("../controllers/family/updateFamily.controller"));
const Authorization_middleware_1 = require("../middlewares/Authorization.middleware");
const familyRoutes = (0, express_1.Router)();
familyRoutes.post("", Authorization_middleware_1.authorization, createFamily_controllers_1.createFamilyController);
familyRoutes.delete("/:id", Authorization_middleware_1.authorization, deleteFamily_controller_1.default);
familyRoutes.get("/:id", Authorization_middleware_1.authorization, listOneFamily_controller_1.default);
familyRoutes.patch("/:id", Authorization_middleware_1.authorization, updateFamily_controller_1.default);
familyRoutes.get("", Authorization_middleware_1.authorization, listAllFamilies_controller_1.listAllFamiliesControler);
exports.default = familyRoutes;
//# sourceMappingURL=family.routes.js.map
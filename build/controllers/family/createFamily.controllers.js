"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamilyController = void 0;
const createFamily_service_1 = require("../../services/family/createFamily.service");
const createFamilyController = async (req, res) => {
    const { name, address_id } = req.body;
    const newFamily = await (0, createFamily_service_1.createFamilyService)({ name, address_id });
    return res.status(201).json(newFamily);
};
exports.createFamilyController = createFamilyController;
//# sourceMappingURL=createFamily.controllers.js.map
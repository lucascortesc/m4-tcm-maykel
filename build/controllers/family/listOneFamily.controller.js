"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listOneFamily_service_1 = __importDefault(require("../../services/family/listOneFamily.service"));
const listOneFamilyController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const listOneFamily = await (0, listOneFamily_service_1.default)(id, userId);
    return res.json(listOneFamily);
};
exports.default = listOneFamilyController;
//# sourceMappingURL=listOneFamily.controller.js.map
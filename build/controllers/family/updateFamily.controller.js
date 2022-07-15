"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateFamily_service_1 = __importDefault(require("../../services/family/updateFamily.service"));
const updateFamilyController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const update = await (0, updateFamily_service_1.default)(req.body, id, userId);
    return res.json(update);
};
exports.default = updateFamilyController;
//# sourceMappingURL=updateFamily.controller.js.map
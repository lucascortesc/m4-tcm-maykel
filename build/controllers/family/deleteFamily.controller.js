"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteFamily_service_1 = __importDefault(require("../../services/family/deleteFamily.service"));
const deleteFamilyController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const deleted = await (0, deleteFamily_service_1.default)(id, userId);
    return res.status(200).json({ message: deleted });
};
exports.default = deleteFamilyController;
//# sourceMappingURL=deleteFamily.controller.js.map
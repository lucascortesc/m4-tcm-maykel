"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteHealthAgent_service_1 = __importDefault(require("../../services/heathAgent/deleteHealthAgent.service"));
const deleteHealthAgentController = async (req, res) => {
    const deletedAgent = await (0, deleteHealthAgent_service_1.default)(req.userId);
    return res.status(200).json({ message: deletedAgent });
};
exports.default = deleteHealthAgentController;
//# sourceMappingURL=deleteHealthAgent.contoller.js.map
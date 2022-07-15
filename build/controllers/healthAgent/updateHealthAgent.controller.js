"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateHealthAgent_service_1 = __importDefault(require("../../services/heathAgent/updateHealthAgent.service"));
const updateHealthAgentController = async (req, res) => {
    const updatedAgent = await (0, updateHealthAgent_service_1.default)(req.userId, req.body);
    return res.status(200).json(updatedAgent);
};
exports.default = updateHealthAgentController;
//# sourceMappingURL=updateHealthAgent.controller.js.map
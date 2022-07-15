"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createHealthAgent_service_1 = __importDefault(require("../../services/heathAgent/createHealthAgent.service"));
const createHealthAgentController = async (req, res) => {
    const { name, email, password } = req.body;
    const healthAgent = await (0, createHealthAgent_service_1.default)({ name, email, password });
    return res.status(201).json(healthAgent);
};
exports.default = createHealthAgentController;
//# sourceMappingURL=createHealthAgent.controller.js.map
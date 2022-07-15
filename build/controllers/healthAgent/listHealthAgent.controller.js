"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const listHealthAgent_service_1 = __importDefault(require("../../services/heathAgent/listHealthAgent.service"));
const listHealthAgentController = async (req, res) => {
    const agents = await (0, listHealthAgent_service_1.default)(req.userId);
    return res.status(200).json(agents);
};
exports.default = listHealthAgentController;
//# sourceMappingURL=listHealthAgent.controller.js.map
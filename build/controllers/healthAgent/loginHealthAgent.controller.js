"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const loginHealthAgent_service_1 = __importDefault(require("../../services/heathAgent/loginHealthAgent.service"));
const loginHealthAgentController = async (req, res) => {
    const { email, password } = req.body;
    const login = await (0, loginHealthAgent_service_1.default)(email, password);
    return res.status(200).json({ token: login });
};
exports.default = loginHealthAgentController;
//# sourceMappingURL=loginHealthAgent.controller.js.map
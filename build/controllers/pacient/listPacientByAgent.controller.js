"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPacientByAgent = void 0;
const listPacientByAgent_service_1 = require("../../services/pacient/listPacientByAgent.service");
const listPacientByAgent = async (req, res) => {
    const agentId = req.userId;
    const listPacient = await (0, listPacientByAgent_service_1.listPacientByAgentService)(agentId);
    return res.status(200).json(listPacient);
};
exports.listPacientByAgent = listPacientByAgent;
//# sourceMappingURL=listPacientByAgent.controller.js.map
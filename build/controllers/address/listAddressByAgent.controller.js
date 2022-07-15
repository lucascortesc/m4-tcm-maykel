"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAddressByAgentController = void 0;
const listAddressByAgent_service_1 = require("../../services/address/listAddressByAgent.service");
const listAddressByAgentController = async (req, res) => {
    const agentId = req.userId;
    const addresses = await (0, listAddressByAgent_service_1.listAddressByAgentService)(agentId);
    return res.json(addresses);
};
exports.listAddressByAgentController = listAddressByAgentController;
//# sourceMappingURL=listAddressByAgent.controller.js.map
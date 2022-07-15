"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllFamiliesControler = void 0;
const listAllFamilies_service_1 = require("../../services/family/listAllFamilies.service");
const listAllFamiliesControler = async (req, res) => {
    const agentId = req.userId;
    const listFamilies = await (0, listAllFamilies_service_1.listAllFamiliesService)(agentId);
    return res.status(200).json(listFamilies);
};
exports.listAllFamiliesControler = listAllFamiliesControler;
//# sourceMappingURL=listAllFamilies.controller.js.map
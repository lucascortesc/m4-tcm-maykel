"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHomeVisitsController = void 0;
const listHomeVisits_service_1 = require("../../services/homeVisit/listHomeVisits.service");
const listHomeVisitsController = async (req, res) => {
    const agentId = req.userId;
    const HomeVisit = await (0, listHomeVisits_service_1.listHomeVisitsService)(agentId);
    return res.status(200).json(HomeVisit);
};
exports.listHomeVisitsController = listHomeVisitsController;
//# sourceMappingURL=listHomeVisits.controller.js.map
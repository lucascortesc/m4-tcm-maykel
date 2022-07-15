"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOneVisitController = void 0;
const listOneVisit_service_1 = require("../../services/homeVisit/listOneVisit.service");
const listOneVisitController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const visit = await (0, listOneVisit_service_1.listOneVisitService)(id, userId);
    return res.status(200).json(visit);
};
exports.listOneVisitController = listOneVisitController;
//# sourceMappingURL=listOneVisit.controller.js.map
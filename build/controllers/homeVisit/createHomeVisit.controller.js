"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHomeVisitController = void 0;
const createHomeVisit_service_1 = require("../../services/homeVisit/createHomeVisit.service");
const createHomeVisitController = async (req, res) => {
    const id = req.userId;
    const { status, message, address_id } = req.body;
    const newHomeVisit = await (0, createHomeVisit_service_1.createHomeVisitService)(id, {
        status,
        message,
        address_id,
    });
    return res.status(201).json(newHomeVisit);
};
exports.createHomeVisitController = createHomeVisitController;
//# sourceMappingURL=createHomeVisit.controller.js.map
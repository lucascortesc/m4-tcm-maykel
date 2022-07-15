"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const updateHomeVisit_service_1 = __importDefault(require("../../services/homeVisit/updateHomeVisit.service"));
const updateHomeVisitController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const updatedVisit = await (0, updateHomeVisit_service_1.default)(id, req.body, userId);
    return res.status(200).json(updatedVisit);
};
exports.default = updateHomeVisitController;
//# sourceMappingURL=updateHomeVisit.controller.js.map
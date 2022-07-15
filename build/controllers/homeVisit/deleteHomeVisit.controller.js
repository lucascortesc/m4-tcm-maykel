"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const deleteHomeVisit_service_1 = __importDefault(require("../../services/homeVisit/deleteHomeVisit.service"));
const deleteHomeVisitController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const deleteVisit = await (0, deleteHomeVisit_service_1.default)(id, userId);
    return res.status(200).json({
        "message": deleteVisit
    });
};
exports.default = deleteHomeVisitController;
//# sourceMappingURL=deleteHomeVisit.controller.js.map
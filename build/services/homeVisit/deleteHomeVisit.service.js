"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const homeVisit_entity_1 = require("../../entities/homeVisit.entity");
const appError_1 = require("../../errors/appError");
const deleteHomeVisitService = async (id, userId) => {
    const getVisitsRepo = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const findVisit = await getVisitsRepo.findOneBy({ id: id });
    if (!findVisit) {
        throw new appError_1.AppError("Visit not found", 404);
    }
    if (findVisit.agent_id.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to visit", 403);
    }
    await getVisitsRepo.delete(id);
    return "User deleted with success";
};
exports.default = deleteHomeVisitService;
//# sourceMappingURL=deleteHomeVisit.service.js.map
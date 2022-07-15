"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOneVisitService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const homeVisit_entity_1 = require("../../entities/homeVisit.entity");
const appError_1 = require("../../errors/appError");
const listOneVisitService = async (visitId, agentId) => {
    const homeVisitRepository = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const visit = await homeVisitRepository.findOneBy({ id: visitId });
    if (!visit) {
        throw new appError_1.AppError("Visit not found", 404);
    }
    if (visit.agent_id.id !== agentId) {
        throw new appError_1.AppError("Agent does not have access to visit", 403);
    }
    return {
        id: visit.id,
        created_at: visit.created_at,
        updated_at: visit.updated_at,
        status: visit.status,
        message: visit.message,
        agent_id: visit.agent_id.id,
        address_id: visit.address_id.id,
    };
};
exports.listOneVisitService = listOneVisitService;
//# sourceMappingURL=listOneVisit.service.js.map
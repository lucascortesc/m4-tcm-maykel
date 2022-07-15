"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listHomeVisitsService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const homeVisit_entity_1 = require("../../entities/homeVisit.entity");
const appError_1 = require("../../errors/appError");
const listHomeVisitsService = async (agentId) => {
    const homeVisitsRepository = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const agentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agent = await agentRepository.findOneBy({
        id: agentId,
    });
    if (!agent) {
        throw new appError_1.AppError("Home visits not found", 404);
    }
    const homeVisits = await homeVisitsRepository.find({
        where: {
            agent_id: agent,
        },
    });
    if (!homeVisits) {
        throw new appError_1.AppError("Home visits not found", 404);
    }
    const formatedVisits = homeVisits.map((visit) => {
        return {
            id: visit.id,
            status: visit.status,
            message: visit.message,
            address_id: visit.address_id.id,
            agent_id: visit.id,
            created_at: visit.created_at,
            updated_at: visit.updated_at,
        };
    });
    return formatedVisits;
};
exports.listHomeVisitsService = listHomeVisitsService;
//# sourceMappingURL=listHomeVisits.service.js.map
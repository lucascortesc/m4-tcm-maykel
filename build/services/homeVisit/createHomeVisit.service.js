"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHomeVisitService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const homeVisit_entity_1 = require("../../entities/homeVisit.entity");
const appError_1 = require("../../errors/appError");
const createHomeVisitService = async (agent_id, { status, message, address_id }) => {
    const homeVisitRepository = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const agentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const agent = await agentRepository.findOneBy({ id: agent_id });
    const address = await addressRepository.findOneBy({
        id: address_id,
    });
    if (!agent) {
        throw new appError_1.AppError("agent does not exist.", 404);
    }
    if (!address) {
        throw new appError_1.AppError("address does not exist.", 404);
    }
    if (address.agent.id !== agent_id) {
        throw new appError_1.AppError("Agent does not have access to address", 403);
    }
    const newHomeVisit = homeVisitRepository.create({
        message,
        status,
        address_id: address,
        agent_id: agent,
    });
    await homeVisitRepository.save(newHomeVisit);
    const homeVisit = {
        id: newHomeVisit.id,
        status,
        message,
        address_id: address.id,
        agent_id: agent.id,
        created_at: newHomeVisit.created_at,
        updated_at: newHomeVisit.updated_at,
    };
    return homeVisit;
};
exports.createHomeVisitService = createHomeVisitService;
//# sourceMappingURL=createHomeVisit.service.js.map
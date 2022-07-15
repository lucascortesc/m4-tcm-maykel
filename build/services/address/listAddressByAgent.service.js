"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAddressByAgentService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const appError_1 = require("../../errors/appError");
const listAddressByAgentService = async (agentId) => {
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const agentsRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agent = await agentsRepository.findOneBy({ id: agentId });
    if (!agent) {
        throw new appError_1.AppError("Agent does not exist.", 400);
    }
    const addresses = await addressRepository.find({
        where: { agent: agent },
    });
    const withoutAgent = addresses.map((el) => {
        return {
            id: el.id,
            state: el.state,
            city: el.city,
            street: el.street,
            number: el.number,
            cep: el.cep,
            agent_id: agent.id,
        };
    });
    return withoutAgent;
};
exports.listAddressByAgentService = listAddressByAgentService;
//# sourceMappingURL=listAddressByAgent.service.js.map
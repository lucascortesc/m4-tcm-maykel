"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddressService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const appError_1 = require("../../errors/appError");
const createAddressService = async ({ state, city, cep, number, street }, agentId) => {
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const healthAgentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const findAddress = await addressRepository.findOne({
        where: {
            state,
            city,
            cep,
            number,
            street,
        },
    });
    const healthAgent = await healthAgentRepository.findOneBy({
        id: agentId,
    });
    if (!healthAgent) {
        throw new appError_1.AppError("Agent not found", 404);
    }
    if (findAddress) {
        throw new appError_1.AppError("Adress already exists");
    }
    const newAddress = await addressRepository.save({
        state,
        city,
        cep,
        number,
        street,
        agent: healthAgent,
    });
    const returnAddress = {
        id: newAddress.id,
        state: newAddress.state,
        city: newAddress.city,
        cep: newAddress.cep,
        number: newAddress.number,
        street: newAddress.street,
        agent_id: newAddress.agent.id,
    };
    return returnAddress;
};
exports.createAddressService = createAddressService;
//# sourceMappingURL=createAddress.service.js.map
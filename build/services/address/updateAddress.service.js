"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const updateAddressService = async (id, agentId, data) => {
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const address = await addressRepository.findOneBy({ id });
    if (data.id) {
        throw new appError_1.AppError("You can't change the address id", 403);
    }
    if (data.agent_id) {
        throw new appError_1.AppError("You can't change the agent id", 403);
    }
    if (!address) {
        throw new appError_1.AppError("address does not exist.", 404);
    }
    if (agentId !== address.agent.id) {
        throw new appError_1.AppError("address don't belong to you, cannot update.");
    }
    await addressRepository.update(id, {
        state: data.state || address.state,
        city: data.city || address.city,
        street: data.street || address.street,
        number: data.number || address.number,
        cep: data.cep || address.cep,
    });
    const updatedAddress = await addressRepository.findOneBy({ id });
    if (!updatedAddress) {
        throw new appError_1.AppError("address does not exist.", 404);
    }
    const withoutAgent = {
        id: id,
        agent_id: agentId,
        state: updatedAddress.state,
        city: updatedAddress.city,
        street: updatedAddress.street,
        number: updatedAddress.number,
        cep: updatedAddress.cep,
    };
    return withoutAgent;
};
exports.updateAddressService = updateAddressService;
//# sourceMappingURL=updateAddress.service.js.map
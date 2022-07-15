"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAddressService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const listAddressService = async (addressId, userId) => {
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const address = await addressRepository.findOne({
        where: {
            id: addressId,
        },
    });
    if (!address) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (address.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to address", 403);
    }
    const returnAddress = {
        id: address.id,
        state: address.state,
        city: address.city,
        cep: address.cep,
        number: address.number,
        street: address.street,
        agent_id: address.agent.id,
    };
    return returnAddress;
};
exports.listAddressService = listAddressService;
//# sourceMappingURL=listAddress.service.js.map
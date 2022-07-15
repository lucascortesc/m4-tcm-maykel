"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const deleteAddressService = async (id, agentId) => {
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const findAddress = await addressRepository.findOneBy({ id: id });
    if (!findAddress) {
        throw new appError_1.AppError("Address does not exists.");
    }
    if (findAddress.agent.id !== agentId) {
        throw new appError_1.AppError("Agent does not have access to address", 403);
    }
    await addressRepository.delete(id);
    return "Address deleted with sucess";
};
exports.deleteAddressService = deleteAddressService;
//# sourceMappingURL=deleteAddress.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const family_entity_1 = require("../../entities/family.entity");
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const deleteFamilyService = async (id, userId) => {
    const familyRepository = data_source_1.default.getRepository(family_entity_1.Family);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const findFamily = await familyRepository.findOneBy({ id: id });
    if (!findFamily) {
        throw new appError_1.AppError("Family not found", 404);
    }
    const findAddress = await addressRepository.findOneBy({ id: findFamily.address.id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (findAddress.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to family", 403);
    }
    await familyRepository.delete(id);
    return "Family deleted with success.";
};
exports.default = deleteFamilyService;
//# sourceMappingURL=deleteFamily.service.js.map
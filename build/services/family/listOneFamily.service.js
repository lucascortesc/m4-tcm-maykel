"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const family_entity_1 = require("../../entities/family.entity");
const appError_1 = require("../../errors/appError");
const address_entity_1 = require("../../entities/address.entity");
const listOneFamilyService = async (id, userId) => {
    const findFamilyRepo = data_source_1.default.getRepository(family_entity_1.Family);
    const findOneFamily = await findFamilyRepo.findOneBy({ id: id });
    if (!findOneFamily) {
        throw new appError_1.AppError("Family not found", 404);
    }
    const findAddressRepo = data_source_1.default.getRepository(address_entity_1.Address);
    const findAddress = await findAddressRepo.findOneBy({ id: findOneFamily.address.id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (findAddress.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to family", 403);
    }
    return {
        id: findOneFamily.id,
        name: findOneFamily.name,
        address_id: findOneFamily.address.id,
    };
};
exports.default = listOneFamilyService;
//# sourceMappingURL=listOneFamily.service.js.map
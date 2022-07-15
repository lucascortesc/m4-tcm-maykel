"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const family_entity_1 = require("../../entities/family.entity");
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const updateFamilyService = async (data, id, userId) => {
    const getFamilyRepo = data_source_1.default.getRepository(family_entity_1.Family);
    const findFamily = await getFamilyRepo.findOneBy({ id: id });
    if (data.id) {
        throw new appError_1.AppError("You can't change the family id", 403);
    }
    if (data.address_id) {
        throw new appError_1.AppError("You can't change the address id", 403);
    }
    if (!findFamily) {
        throw new appError_1.AppError("Family not found", 404);
    }
    const getAddressRepo = data_source_1.default.getRepository(address_entity_1.Address);
    const findAddress = await getAddressRepo.findOneBy({ id: findFamily.address.id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (findAddress.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to family", 403);
    }
    await getFamilyRepo.update(id, data);
    const findFamilyAfterUpdate = await getFamilyRepo.findOneBy({ id: id });
    if (!findFamilyAfterUpdate) {
        throw new appError_1.AppError("Family not found", 404);
    }
    return {
        id: findFamilyAfterUpdate.id,
        name: findFamilyAfterUpdate.name,
        address_id: findFamilyAfterUpdate.address.id,
    };
};
exports.default = updateFamilyService;
//# sourceMappingURL=updateFamily.service.js.map
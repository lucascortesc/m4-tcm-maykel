"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFamilyService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const family_entity_1 = require("../../entities/family.entity");
const address_entity_1 = require("../../entities/address.entity");
const appError_1 = require("../../errors/appError");
const createFamilyService = async ({ name, address_id }) => {
    const familyRepository = data_source_1.default.getRepository(family_entity_1.Family);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    if (!name) {
        throw new appError_1.AppError("Name cannot be null", 400);
    }
    const findAddress = await addressRepository.findOneBy({
        id: address_id,
    });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    const findFamily = await familyRepository.findOneBy({ address: findAddress });
    if (findFamily) {
        throw new appError_1.AppError("Address already has a registered family");
    }
    const newFamily = await familyRepository.save({
        name,
        address: findAddress,
    });
    const responseFamily = {
        id: newFamily.id,
        name: newFamily.name,
        address_id: newFamily.address.id,
    };
    return responseFamily;
};
exports.createFamilyService = createFamilyService;
//# sourceMappingURL=createFamily.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePacientService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const family_entity_1 = require("../../entities/family.entity");
const pacient_entity_1 = require("../../entities/pacient.entity");
const appError_1 = require("../../errors/appError");
const deletePacientService = async (id, userId) => {
    const getAddressRepo = data_source_1.default.getRepository(address_entity_1.Address);
    const getFamilyRepo = data_source_1.default.getRepository(family_entity_1.Family);
    const getPacientRepository = data_source_1.default.getRepository(pacient_entity_1.Pacient);
    const findPacient = await getPacientRepository.findOneBy({ id: id });
    if (!findPacient) {
        throw new appError_1.AppError("Pacient not found", 404);
    }
    const findFamily = await getFamilyRepo.findOneBy({ id: findPacient.family.id });
    if (!findFamily) {
        throw new appError_1.AppError("Family not found", 404);
    }
    const findAddress = await getAddressRepo.findOneBy({ id: findFamily.address.id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (findAddress.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to pacient", 403);
    }
    await getPacientRepository.delete(id);
    return true;
};
exports.deletePacientService = deletePacientService;
//# sourceMappingURL=deletePacient.service.js.map
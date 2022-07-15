"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPacientService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const address_entity_1 = require("../../entities/address.entity");
const family_entity_1 = require("../../entities/family.entity");
const pacient_entity_1 = require("../../entities/pacient.entity");
const appError_1 = require("../../errors/appError");
const createPacientService = async ({ age, cpf, family_id, is_owner, last_name, name, tel }, agentId) => {
    const pacientRepository = data_source_1.default.getRepository(pacient_entity_1.Pacient);
    const familyRepository = data_source_1.default.getRepository(family_entity_1.Family);
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const findPacient = await pacientRepository.findOneBy({ cpf: cpf });
    const findFamily = await familyRepository.findOneBy({ id: family_id });
    if (!findFamily) {
        throw new appError_1.AppError("Family not found", 404);
    }
    const addressId = findFamily.address.id;
    const address = await addressRepository.findOneBy({ id: addressId });
    if (!address) {
        throw new appError_1.AppError("Address not found", 404);
    }
    const agentIdfromAdress = address.agent.id;
    if (agentIdfromAdress !== agentId) {
        throw new appError_1.AppError("Agent does not have access to family", 403);
    }
    if (findPacient) {
        throw new appError_1.AppError("Pacient already exists");
    }
    const newPacient = pacientRepository.create({
        age,
        cpf,
        family: findFamily,
        is_owner,
        last_name,
        name,
        tel,
    });
    await pacientRepository.save(newPacient);
    const responsePacient = {
        id: newPacient.id,
        name: newPacient.name,
        last_name: newPacient.last_name,
        age: newPacient.age,
        cpf: newPacient.cpf,
        family_id: findFamily.id,
        is_owner: newPacient.is_owner,
        tel: newPacient.tel,
    };
    return responsePacient;
};
exports.createPacientService = createPacientService;
//# sourceMappingURL=createPacient.service.js.map
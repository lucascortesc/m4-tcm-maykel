"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOnePacientService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const pacient_entity_1 = require("../../entities/pacient.entity");
const appError_1 = require("../../errors/appError");
const listOnePacientService = async (id) => {
    const pacientRepository = data_source_1.default.getRepository(pacient_entity_1.Pacient);
    const findOnePacient = await pacientRepository.findOneBy({ id: id });
    if (!findOnePacient) {
        throw new appError_1.AppError("Pacient not found", 404);
    }
    if (findOnePacient.family.address.agent.id) {
        throw new appError_1.AppError("Agent does not have access to pacient", 403);
    }
    const pacient = {
        id: findOnePacient.id,
        cpf: findOnePacient.cpf,
        name: findOnePacient.name,
        last_name: findOnePacient.last_name,
        age: findOnePacient.age,
        tel: findOnePacient.tel,
        is_owner: findOnePacient.is_owner,
        family_id: findOnePacient.family.id,
    };
    return pacient;
};
exports.listOnePacientService = listOnePacientService;
//# sourceMappingURL=listOnePatient.service.js.map
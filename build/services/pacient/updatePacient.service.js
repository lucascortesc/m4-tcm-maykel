"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePacientService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const pacient_entity_1 = require("../../entities/pacient.entity");
const appError_1 = require("../../errors/appError");
const updatePacientService = async (data, pacientId, agentId) => {
    const pacientRepository = data_source_1.default.getRepository(pacient_entity_1.Pacient);
    const pacient = await pacientRepository.findOneBy({ id: pacientId });
    if (!pacient) {
        throw new appError_1.AppError("Pacient not found", 404);
    }
    const findPacientAgent = await pacientRepository
        .createQueryBuilder("pacient")
        .leftJoinAndSelect("pacient.family", "family")
        .leftJoinAndSelect("family.address", "address")
        .leftJoinAndSelect("address.agent", "agent")
        .where("pacient.id = :pacientId", { pacientId })
        .getMany();
    const pacientAgentId = findPacientAgent[0].family.address.agent.id;
    if (pacientAgentId !== agentId) {
        throw new appError_1.AppError("Agent does not have  to pacient", 401);
    }
    if (data.id) {
        throw new appError_1.AppError("You can't change the pacient id", 403);
    }
    if (data.family_id) {
        throw new appError_1.AppError("You can't change the family id from pacient", 403);
    }
    await pacientRepository.update(pacientId, data);
    const updatedPacient = await pacientRepository.findOneBy({ id: pacientId });
    if (!updatedPacient) {
        throw new appError_1.AppError("something went wrong with the server, please try again");
    }
    const responsePacient = {
        id: updatedPacient.id,
        name: updatedPacient.name,
        last_name: updatedPacient.last_name,
        age: updatedPacient.age,
        cpf: updatedPacient.cpf,
        family_id: updatedPacient.id,
        is_owner: updatedPacient.is_owner,
        tel: updatedPacient.tel,
    };
    return responsePacient;
};
exports.updatePacientService = updatePacientService;
//# sourceMappingURL=updatePacient.service.js.map
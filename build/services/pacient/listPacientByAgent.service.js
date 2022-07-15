"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listPacientByAgentService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const pacient_entity_1 = require("../../entities/pacient.entity");
const appError_1 = require("../../errors/appError");
const listPacientByAgentService = async (agentId) => {
    const pacientRepository = data_source_1.default.getRepository(pacient_entity_1.Pacient);
    const agentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agent = await agentRepository.findOneBy({ id: agentId });
    if (!agent) {
        throw new appError_1.AppError("Agent does not exist", 404);
    }
    const findPacients = await pacientRepository.find();
    const filtredPacients = [];
    findPacients.forEach((pacient) => {
        if (pacient.family.address.agent.id === agentId) {
            const formatedPacient = {
                id: pacient.id,
                name: pacient.name,
                last_name: pacient.last_name,
                cpf: pacient.cpf,
                age: pacient.age,
                tel: pacient.tel,
                is_owner: pacient.is_owner,
                family_id: pacient.family.id,
                address_id: pacient.family.address.id,
            };
            filtredPacients.push(formatedPacient);
        }
    });
    return filtredPacients;
};
exports.listPacientByAgentService = listPacientByAgentService;
//# sourceMappingURL=listPacientByAgent.service.js.map
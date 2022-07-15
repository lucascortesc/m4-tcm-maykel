"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const appError_1 = require("../../errors/appError");
const deleteHealthAgentService = async (id) => {
    const agentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agent = await agentRepository.findOneBy({ id: id });
    if (!agent) {
        throw new appError_1.AppError("Agent does not exists.");
    }
    await agentRepository.update(id, { isactive: false });
    return "User deleted with success";
};
exports.default = deleteHealthAgentService;
//# sourceMappingURL=deleteHealthAgent.service.js.map
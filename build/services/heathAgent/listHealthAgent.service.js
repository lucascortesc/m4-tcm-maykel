"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const data_source_1 = __importDefault(require("../../data-source"));
const appError_1 = require("../../errors/appError");
const listHealthAgentService = async (id) => {
    const healthAgentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const agents = await healthAgentRepository.findOneBy({ id: id });
    if (!agents) {
        throw new appError_1.AppError("User does not exists", 400);
    }
    const newAgent = { ...agents };
    return { ...newAgent, password: undefined };
};
exports.default = listHealthAgentService;
//# sourceMappingURL=listHealthAgent.service.js.map
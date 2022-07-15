"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const appError_1 = require("../../errors/appError");
const bcrypt_1 = require("bcrypt");
const updateHealthAgentService = async (id, data) => {
    const healthAgentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    if (data.id) {
        throw new appError_1.AppError("You can't change the agent id.", 403);
    }
    if (data.isactive) {
        throw new appError_1.AppError("Use the method delete to delete the agent.", 403);
    }
    const agent = await healthAgentRepository.findOneBy({ id: id });
    await healthAgentRepository.update(id, {
        name: data.name || agent?.name,
        email: data.email || agent?.email,
        password: data.password ? await (0, bcrypt_1.hash)(data.password, 10) : agent?.password,
    });
    const updatedAgent = await healthAgentRepository.findOneBy({ id: id });
    if (!updatedAgent) {
        throw new appError_1.AppError("Agent can not be updated, don't worry it's not your fault.");
    }
    const newUpdatedAgent = { ...updatedAgent };
    return { ...newUpdatedAgent, password: undefined };
};
exports.default = updateHealthAgentService;
//# sourceMappingURL=updateHealthAgent.service.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const data_source_1 = __importDefault(require("../../data-source"));
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const appError_1 = require("../../errors/appError");
const createHealthAgentService = async ({ name, email, password, }) => {
    const healthAgentRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const verifyEmail = await healthAgentRepository.findOneBy({ email: email });
    if (verifyEmail) {
        throw new appError_1.AppError("Email already exists.");
    }
    const hashedPassword = await (0, bcrypt_1.hash)(password, 10);
    const healthAgent = healthAgentRepository.create({
        name,
        email,
        isactive: true,
        password: hashedPassword,
    });
    await healthAgentRepository.save(healthAgent);
    const newAgent = { ...healthAgent };
    return { ...newAgent, password: undefined };
};
exports.default = createHealthAgentService;
//# sourceMappingURL=createHealthAgent.service.js.map
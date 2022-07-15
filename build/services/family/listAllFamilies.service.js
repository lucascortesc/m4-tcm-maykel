"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAllFamiliesService = void 0;
const healthAgent_entity_1 = require("../../entities/healthAgent.entity");
const family_entity_1 = require("../../entities/family.entity");
const data_source_1 = __importDefault(require("../../data-source"));
const appError_1 = require("../../errors/appError");
const listAllFamiliesService = async (agentId) => {
    const agentsRepository = data_source_1.default.getRepository(healthAgent_entity_1.Agent);
    const familyRepository = data_source_1.default.getRepository(family_entity_1.Family);
    const agent = await agentsRepository.findOneBy({ id: agentId });
    if (!agent) {
        throw new appError_1.AppError("Agent does not exist");
    }
    const findFamilies = await familyRepository.find();
    const filterFamilies = [];
    findFamilies.forEach((family) => {
        if (family.address.agent.id === agentId) {
            const formatedFamily = {
                id: family.id,
                name: family.name,
                address_id: family.address.id,
            };
            filterFamilies.push(formatedFamily);
        }
    });
    return filterFamilies;
};
exports.listAllFamiliesService = listAllFamiliesService;
//# sourceMappingURL=listAllFamilies.service.js.map
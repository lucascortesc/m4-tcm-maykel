"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const homeVisit_entity_1 = require("../../entities/homeVisit.entity");
const appError_1 = require("../../errors/appError");
const address_entity_1 = require("../../entities/address.entity");
const updateHomeVisitService = async (id, data, userId) => {
    const homeVisitRepository = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const addressRepository = data_source_1.default.getTreeRepository(address_entity_1.Address);
    if (!homeVisitRepository) {
        throw new appError_1.AppError("teste", 400);
    }
    if (data.id) {
        throw new appError_1.AppError("You can't change the home visit id.", 403);
    }
    if (data.agent_id) {
        throw new appError_1.AppError("You can't change the agent id", 403);
    }
    if (data.address_id) {
        throw new appError_1.AppError("You can't change the agent id", 403);
    }
    const homeVisit = await homeVisitRepository.findOneBy({ id: id });
    if (!homeVisit) {
        throw new appError_1.AppError("Visit not found", 404);
    }
    const findAddress = await addressRepository.findOneBy({ id: homeVisit.address_id.id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    if (findAddress.agent.id !== userId) {
        throw new appError_1.AppError("Agent does not have access to address", 403);
    }
    await homeVisitRepository.update(id, data);
    const updatedVisit = await homeVisitRepository.findOneBy({ id: id });
    if (!updatedVisit) {
        throw new appError_1.AppError("Visit can not be updated, don't worry it's not your fault.");
    }
    return {
        id: updatedVisit.id,
        status: updatedVisit.status,
        message: updatedVisit.message,
        updated_at: updatedVisit.updated_at,
        created_at: updatedVisit.created_at,
        agent_id: updatedVisit.agent_id.id,
        address_id: updatedVisit.address_id.id,
    };
};
exports.default = updateHomeVisitService;
//# sourceMappingURL=updateHomeVisit.service.js.map
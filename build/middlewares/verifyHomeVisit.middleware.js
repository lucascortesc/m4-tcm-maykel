"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const homeVisit_entity_1 = require("../entities/homeVisit.entity");
const appError_1 = require("../errors/appError");
const verifyHomeVisit = async (req, res, next) => {
    const { id } = req.params;
    const homeVisitRepository = data_source_1.default.getRepository(homeVisit_entity_1.HomeVisit);
    const findHomeVisit = await homeVisitRepository.findOneBy({ id: id });
    if (!findHomeVisit) {
        throw new appError_1.AppError("Visit not found");
    }
    next();
};
exports.default = verifyHomeVisit;
//# sourceMappingURL=verifyHomeVisit.middleware.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const family_entity_1 = require("../entities/family.entity");
const appError_1 = require("../errors/appError");
const verifyFamily = async (req, res, next) => {
    const { id } = req.params;
    const familyRepository = data_source_1.default.getRepository(family_entity_1.Family);
    const findFamily = await familyRepository.findOneBy({ id: id });
    if (!findFamily) {
        throw new appError_1.AppError("Family not found");
    }
    next();
};
exports.default = verifyFamily;
//# sourceMappingURL=verifyFamily.middleware.js.map
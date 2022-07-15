"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../data-source"));
const address_entity_1 = require("../entities/address.entity");
const appError_1 = require("../errors/appError");
const verifyAddress = async (req, res, next) => {
    const { id } = req.params;
    const addressRepository = data_source_1.default.getRepository(address_entity_1.Address);
    const findAddress = await addressRepository.findOneBy({ id: id });
    if (!findAddress) {
        throw new appError_1.AppError("Address not found", 404);
    }
    next();
};
exports.default = verifyAddress;
//# sourceMappingURL=verifyAddress.middleware.js.map
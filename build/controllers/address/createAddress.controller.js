"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAddress = void 0;
const createAddress_service_1 = require("../../services/address/createAddress.service");
const createAddress = async (req, res) => {
    const { state, city, cep, number, street } = req.body;
    const newAddress = await (0, createAddress_service_1.createAddressService)({ state, city, cep, number, street }, req.userId);
    return res.status(201).json(newAddress);
};
exports.createAddress = createAddress;
//# sourceMappingURL=createAddress.controller.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listAddress = void 0;
const listAddress_service_1 = require("../../services/address/listAddress.service");
const listAddress = async (req, res) => {
    const addressId = req.params.id;
    const { userId } = req;
    const Address = await (0, listAddress_service_1.listAddressService)(addressId, userId);
    return res.status(201).json(Address);
};
exports.listAddress = listAddress;
//# sourceMappingURL=listAddress.controller.js.map
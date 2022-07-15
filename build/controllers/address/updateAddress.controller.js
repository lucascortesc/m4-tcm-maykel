"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressController = void 0;
const updateAddress_service_1 = require("../../services/address/updateAddress.service");
const updateAddressController = async (req, res) => {
    const { id } = req.params;
    const updatedAddress = await (0, updateAddress_service_1.updateAddressService)(id, req.userId, req.body);
    return res.json(updatedAddress);
};
exports.updateAddressController = updateAddressController;
//# sourceMappingURL=updateAddress.controller.js.map
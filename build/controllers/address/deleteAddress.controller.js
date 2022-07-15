"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = void 0;
const deleteAddress_service_1 = require("../../services/address/deleteAddress.service");
const deleteAddressController = async (req, res) => {
    const addressId = req.params.id;
    const deletedAddress = await (0, deleteAddress_service_1.deleteAddressService)(addressId, req.userId);
    return res.status(200).json({ message: deletedAddress });
};
exports.deleteAddressController = deleteAddressController;
//# sourceMappingURL=deleteAddress.controller.js.map
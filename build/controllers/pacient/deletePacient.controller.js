"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePacientController = void 0;
const deletePacient_service_1 = require("../../services/pacient/deletePacient.service");
const deletePacientController = async (req, res) => {
    const { id } = req.params;
    const { userId } = req;
    const deletePacient = await (0, deletePacient_service_1.deletePacientService)(id, userId);
    return res.status(200).json({
        message: "Pacient deleted with success",
    });
};
exports.deletePacientController = deletePacientController;
//# sourceMappingURL=deletePacient.controller.js.map
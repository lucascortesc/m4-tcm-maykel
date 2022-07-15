"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePacient = void 0;
const updatePacient_service_1 = require("../../services/pacient/updatePacient.service");
const updatePacient = async (req, res) => {
    const agentId = req.userId;
    const pacientId = req.params.id;
    const updatedPacient = await (0, updatePacient_service_1.updatePacientService)(req.body, pacientId, agentId);
    return res.status(200).json(updatedPacient);
};
exports.updatePacient = updatePacient;
//# sourceMappingURL=updatePacient.controller.js.map
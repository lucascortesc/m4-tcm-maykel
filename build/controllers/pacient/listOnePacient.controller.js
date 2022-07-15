"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listOnePatientController = void 0;
const listOnePatient_service_1 = require("../../services/pacient/listOnePatient.service");
const listOnePatientController = async (req, res) => {
    const { id } = req.params;
    const listOnePatient = await (0, listOnePatient_service_1.listOnePacientService)(id);
    return res.json(listOnePatient);
};
exports.listOnePatientController = listOnePatientController;
//# sourceMappingURL=listOnePacient.controller.js.map
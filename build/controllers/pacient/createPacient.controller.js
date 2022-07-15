"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPacient = void 0;
const createPacient_service_1 = require("../../services/pacient/createPacient.service");
const createPacient = async (req, res) => {
    const agentId = req.userId;
    const { age, cpf, family_id, is_owner, last_name, name, tel, } = req.body;
    const newPacient = await (0, createPacient_service_1.createPacientService)({ age, cpf, family_id, is_owner, last_name, name, tel }, agentId);
    return res.status(201).json(newPacient);
};
exports.createPacient = createPacient;
//# sourceMappingURL=createPacient.controller.js.map
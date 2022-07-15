import { Request, Response } from "express";
import { ICreatePacient } from "../../interfaces/pacient";
import { createPacientService } from "../../services/pacient/createPacient.service";

export const createPacient = async (req: Request, res: Response) => {
  const agentId = req.userId;
  const {
    age,
    cpf,
    family_id,
    is_owner,
    last_name,
    name,
    tel,
  }: ICreatePacient = req.body;
  console.log("chegou");
  const newPacient = await createPacientService(
    { age, cpf, family_id, is_owner, last_name, name, tel },
    agentId
  );

  return res.status(201).json(newPacient);
};

import AppDataSource from "../../data-source";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";

export const listOnePacientService = async (id: string, agentId: string) => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const findOnePacient = await pacientRepository.findOneBy({ id: id });

  if (!findOnePacient) {
    throw new AppError("pacient not found", 404);
  }

  if (findOnePacient.family.address.agent.id !== agentId) {
    throw new AppError("Agent does not have access to pacient", 403);
  }

  const pacient = {
    id: findOnePacient.id,
    cpf: findOnePacient.cpf,
    name: findOnePacient.name,
    last_name: findOnePacient.last_name,
    age: findOnePacient.age,
    tel: findOnePacient.tel,
    is_owner: findOnePacient.is_owner,
    family_id: findOnePacient.family.id,
  };

  return pacient;
};

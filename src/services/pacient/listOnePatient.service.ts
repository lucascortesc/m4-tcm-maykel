import AppDataSource from "../../data-source";
import { Pacient } from "../../entities/pacient.entity";

export const listOnePacientService = async (id: string) => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const findOnePacient = await pacientRepository.findOneBy({ id: id });

  return findOnePacient;
};

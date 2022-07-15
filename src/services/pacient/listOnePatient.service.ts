import AppDataSource from "../../data-source";
import { Pacient } from "../../entities/pacient.entity";

export const listOnePacientService = async (id: string) => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const findOnePacient = await pacientRepository.findOneBy({ id: id });

  const pacient = {
    id: findOnePacient?.id,
    cpf: findOnePacient?.cpf,
    name: findOnePacient?.name,
    last_name: findOnePacient?.last_name,
    age: findOnePacient?.age,
    tel: findOnePacient?.tel,
    is_owner: findOnePacient?.is_owner,
    family_id: findOnePacient?.family.id,
  };

  return pacient;
};

import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Family } from "../../entities/family.entity";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";
import { ICreatePacient, IPacient } from "../../interfaces/pacient";

export const createPacientService = async (
  { age, cpf, family_id, is_owner, last_name, name, tel }: ICreatePacient,
  agentId: string
): Promise<IPacient> => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const familyRepository = AppDataSource.getRepository(Family);
  const addressRepository = AppDataSource.getRepository(Address);

  const findPacient = await pacientRepository.findOneBy({ cpf: cpf });

  const findFamily = await familyRepository.findOneBy({ id: family_id });

  if (!findFamily) {
    throw new AppError("Family not found", 404);
  }

  const addressId = findFamily.address.id;

  const address = await addressRepository.findOneBy({ id: addressId });

  if (!address) {
    throw new AppError("Address not found", 404);
  }

  const agentIdfromAdress = address.agent.id;

  if (agentIdfromAdress !== agentId) {
    throw new AppError("Agent does not have access to family");
  }

  if (findPacient) {
    throw new AppError("Pacient already exists");
  }

  const newPacient = pacientRepository.create({
    age,
    cpf,
    family: findFamily,
    is_owner,
    last_name,
    name,
    tel,
  });

  await pacientRepository.save(newPacient);

  const responsePacient = {
    id: newPacient.id,
    name: newPacient.name,
    last_name: newPacient.last_name,
    age: newPacient.age,
    cpf: newPacient.cpf,
    family_id: findFamily.id,
    is_owner: newPacient.is_owner,
    tel: newPacient.tel,
  };

  return responsePacient;
};

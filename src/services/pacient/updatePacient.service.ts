import AppDataSource from "../../data-source";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";
import { IPacient, IUpdatePacient } from "../../interfaces/pacient";

export const updatePacientService = async (
  data: IUpdatePacient,
  pacientId: string,
  agentId: string
): Promise<IPacient> => {
  const pacientRepository = AppDataSource.getRepository(Pacient);

  const pacient = await pacientRepository.findOneBy({ id: pacientId });

  if (!pacient) {
    throw new AppError("Pacient not found", 404);
  }

  const findPacientAgent = await pacientRepository
    .createQueryBuilder("pacient")
    .leftJoinAndSelect("pacient.family", "family")
    .leftJoinAndSelect("family.address", "address")
    .leftJoinAndSelect("address.agent", "agent")
    .where("pacient.id = :pacientId", { pacientId })
    .getMany();

  const pacientAgentId = findPacientAgent[0].family.address.agent.id;

  if (pacientAgentId !== agentId) {
    throw new AppError("Agent does not have access to pacient");
  }

  if (data.id) {
    throw new AppError("You can't change the pacient id");
  }

  if (data.family_id) {
    throw new AppError("You can't change the family id from pacient");
  }

  await pacientRepository.update(pacientId, data);

  const updatedPacient = await pacientRepository.findOneBy({ id: pacientId });

  if (!updatedPacient) {
    throw new AppError("something went wrong with the server, please try again");
  }

  const responsePacient = {
    id: updatedPacient.id,
    name: updatedPacient.name,
    last_name: updatedPacient.last_name,
    age: updatedPacient.age,
    cpf: updatedPacient.cpf,
    family_id: updatedPacient.id,
    is_owner: updatedPacient.is_owner,
    tel: updatedPacient.tel,
  };

  return responsePacient;
};

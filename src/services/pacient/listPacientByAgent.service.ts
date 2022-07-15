import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";
import { IListPacient } from "../../interfaces/pacient";

export const listPacientByAgentService = async (agentId: string): Promise<IListPacient[]> => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const agentRepository = AppDataSource.getRepository(Agent);

  const agent = await agentRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("Agent does not exist", 404);
  }

  const findPacients = await pacientRepository.find();

  const filtredPacients: IListPacient[] = [];

  findPacients.forEach((pacient) => {
    if (pacient.family.address.agent.id === agentId) {
      const formatedPacient = {
        id: pacient.id,
        name: pacient.name,
        last_name: pacient.last_name,
        cpf: pacient.cpf,
        age: pacient.age,
        tel: pacient.tel,
        is_owner: pacient.is_owner,
        family_id: pacient.family.id,
        address_id: pacient.family.address.id,
      };

      filtredPacients.push(formatedPacient);
    }
  });

  return filtredPacients;
};

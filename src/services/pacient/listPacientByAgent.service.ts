import { isDataView } from "util/types";
import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { Family } from "../../entities/family.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";

export const listPacientByAgentService = async (agentId: string) => {
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const familyRepository = AppDataSource.getRepository(Family);
  const addressRepository = AppDataSource.getRepository(Address);
  const agentsRepository = AppDataSource.getRepository(Agent);

  const agent = await agentsRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("Agent does not exist", 404);
  }

  const addresses = await addressRepository.find({
    where: {
      agent: agent,
    },
  });

  if (!addresses) {
    throw new AppError("No address found");
  }
  const families = addresses.map(async (address) => {
    const family = await familyRepository.findOneBy({ address: address });

    if (family) {
      const foundFamily = {
        id: family.id,
        name: family.name,
        address_id: address.id,
      };
      return foundFamily;
    }
  });
  return await Promise.all(families);
};

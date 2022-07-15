import { Address } from "../../entities/address.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { Family } from "../../entities/family.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import { IResponseFamily } from "../../interfaces/family";

export const listAllFamiliesService = async (agentId: string): Promise<IResponseFamily[]> => {
  const agentsRepository = AppDataSource.getRepository(Agent);
  const familyRepository = AppDataSource.getRepository(Family);

  const agent = await agentsRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("Agent does not exist");
  }

  const findFamilies = await familyRepository.find();

  const filterFamilies: IResponseFamily[] = [];

  findFamilies.forEach((family) => {
    if (family.address.agent.id === agentId) {
      const formatedFamily = {
        id: family.id,
        name: family.name,
        address_id: family.address.id,
      };
      filterFamilies.push(formatedFamily);
    }
  });

  return filterFamilies;
};

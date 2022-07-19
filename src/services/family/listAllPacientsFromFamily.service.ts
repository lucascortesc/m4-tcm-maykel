import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { Agent } from "../../entities/healthAgent.entity";
import { Pacient } from "../../entities/pacient.entity";
import { AppError } from "../../errors/appError";

export const listAllPacientsFromFamilyService = async (familyId: string, agentId: string) => {
  const agentRepository = AppDataSource.getRepository(Agent);
  const pacientRepository = AppDataSource.getRepository(Pacient);
  const familyRepository = AppDataSource.getRepository(Family);

  const agent = await agentRepository.findOneBy({ id: agentId });

  if (!agent) {
    throw new AppError("agent not found", 404);
  }

  const family = await familyRepository.findOneBy({ id: familyId });

  if (!family) {
    throw new AppError("family not found", 404);
  }

  if (family.address.agent.id !== agentId) {
    throw new AppError("Agent does not have access to address", 403);
  }

  const pacients = pacientRepository
    .createQueryBuilder("pacient")
    .where("pacient.family_id = :family_id", { family_id: family.id })
    .getMany();

  return pacients;
};

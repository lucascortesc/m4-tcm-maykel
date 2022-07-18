import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IUpdateHealthAgent } from "../../interfaces/healthAgent";

export const activateHealthAgentService = async (id: string): Promise<IUpdateHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agent = await healthAgentRepository.findOneBy({ id: id });

  if (!agent) {
    throw new AppError("agent not found", 404);
  }

  if (agent.isactive) {
    throw new AppError("agent is already active");
  }

  await healthAgentRepository.update(id, { isactive: true });

  const updatedAgent = await healthAgentRepository.findOneBy({ id: id });

  if (!updatedAgent) {
    throw new AppError("something wrong with de server, try again");
  }
  if (!updatedAgent.isactive) {
    throw new AppError("something went wrong and agent has not been activated, try again");
  }

  const responseAgent = {
    id: updatedAgent.id,
    name: updatedAgent.name,
    email: updatedAgent.email,
    isactive: updatedAgent.isactive,
  };

  return responseAgent;
};

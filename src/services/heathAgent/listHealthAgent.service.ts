import { Agent } from "../../entities/healthAgent.entity";
import AppDataSource from "../../data-source";
import { IHealthAgent } from "../../interfaces/healthAgent";
import { AppError } from "../../errors/appError";

const listHealthAgentService = async (id: string): Promise<IHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = await healthAgentRepository.findOneBy({ id: id });

  if (!agents) {
    throw new AppError("User does not exists", 400);
  }

  return { ...agents, password: undefined };
};

export default listHealthAgentService;

import { Agent } from "../../entities/healthAgent.entity";
import AppDataSource from "../../data-source";
import { IHealthAgent } from "../../interfaces/healthAgent";

const listHealthAgentService = (): Promise<IHealthAgent[]> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = healthAgentRepository.find();

  return agents;
};

export default listHealthAgentService;

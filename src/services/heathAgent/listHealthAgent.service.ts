import { Agent } from "../../entities/healthAgent.entity";
import AppDataSource from "../../data-source";
import { IHealthAgent, IResponseHealthAgent } from "../../interfaces/healthAgent";
import { AppError } from "../../errors/appError";

const listHealthAgentService = async (id: string): Promise<IResponseHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const healthAgent = await healthAgentRepository.findOneBy({ id: id });

  if (!healthAgent) {
    throw new AppError("User does not exists", 400);
  }
 

  const newAgent: IResponseHealthAgent = {
    id: healthAgent.id,
    name: healthAgent.name,
    email: healthAgent.email,
    isactive: healthAgent.isactive,
  };

  return newAgent;
};

export default listHealthAgentService;

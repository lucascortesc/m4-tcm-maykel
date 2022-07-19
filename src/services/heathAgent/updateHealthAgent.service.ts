import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IResponseHealthAgent, IUpdateHealthAgent } from "../../interfaces/healthAgent";
import { hash } from "bcrypt";

const updateHealthAgentService = async (id: string, data: IUpdateHealthAgent): Promise<IResponseHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  if (data.id) {
    throw new AppError("You can't change the agent id", 403);
  }
  if (data.hasOwnProperty("isactive")) {
    throw new AppError("Use the method delete to inactivate the agent", 403);
  }
  const agent = await healthAgentRepository.findOneBy({ id: id });

  await healthAgentRepository.update(id, {
    name: data.name || agent?.name,
    email: data.email || agent?.email,
    password: data.password ? await hash(data.password, 10) : agent?.password,
  });

  const healthAgent = await healthAgentRepository.findOneBy({ id: id });

  if (!healthAgent) {
    throw new AppError("Agent can not be updated, don't worry it's not your fault");
  }

  const newAgent: IResponseHealthAgent = {
    id: healthAgent.id,
    name: healthAgent.name,
    email: healthAgent.email,
    isactive: healthAgent.isactive,
  };

  return newAgent;
  
};

export default updateHealthAgentService;

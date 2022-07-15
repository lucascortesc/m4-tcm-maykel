import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IHealthAgent, IUpdateHealthAgent } from "../../interfaces/healthAgent";
import { hash } from "bcrypt";

const updateHealthAgentService = async (id: string, data: IUpdateHealthAgent): Promise<IHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  if (data.id) {
    throw new AppError("You can't change the agent id.", 403);
  }
  if (data.isactive) {
    throw new AppError("Use the method delete to delete the agent.", 403);
  }
  const agent = await healthAgentRepository.findOneBy({ id: id });

  await healthAgentRepository.update(id, {
    name: data.name || agent?.name,
    email: data.email || agent?.email,
    password: data.password ? await hash(data.password, 10) : agent?.password,
  });

  const updatedAgent = await healthAgentRepository.findOneBy({ id: id });
  if (!updatedAgent) {
    throw new AppError("Agent can not be updated, don't worry it's not your fault.");
  }
  const newUpdatedAgent: any = { ...updatedAgent };
  return { ...newUpdatedAgent, password: undefined };
};

export default updateHealthAgentService;

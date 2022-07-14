import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";

const deleteHealthAgentService = async (id: string): Promise<string> => {
  const agentRepository = AppDataSource.getRepository(Agent);

  const agent = await agentRepository.findOneBy({ id: id });

  if (!agent) {
    throw new AppError("Agent does not exists.");
  }
  await agentRepository.update(id, { isactive: false });

  return "User deleted with success";
};

export default deleteHealthAgentService;

import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";

export const activateHealthAgentTokenService = async (
  activateToken: string
): Promise<void> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agent = await healthAgentRepository.findOne({
    where: {
      activationToken: activateToken,
    },
  });

  if (!agent) {
    throw new AppError("User not found", 404);
  }

  await healthAgentRepository.update(
    { id: agent.id },
    { isactive: true, activationToken: "" }
  );

  
};

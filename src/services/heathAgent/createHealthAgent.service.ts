import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { ICreateHealthAgent, IHealthAgent } from "../../interfaces/healthAgent";

const createHealthAgentService = async ({
  name,
  email,
  password,
}: ICreateHealthAgent): Promise<IHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);
  const hashedPassword = await hash(password, 10);

  const healthAgent = healthAgentRepository.create({
    name,
    email,
    isActive: true,
    password: hashedPassword,
  });

  await healthAgentRepository.save(healthAgent);

  return { ...healthAgent, password: undefined };
};

export default createHealthAgentService;

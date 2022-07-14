import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { ICreateHealthAgent, IHealthAgent } from "../../interfaces/healthAgent";

const createHealthAgentService = async ({
  name,
  email,
  password,
}: ICreateHealthAgent): Promise<IHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const verifyEmail = await healthAgentRepository.findOneBy({ email: email });
  if (verifyEmail) {
    throw new AppError("Email already exists.");
  }

  const hashedPassword = await hash(password, 10);

  const healthAgent = healthAgentRepository.create({
    name,
    email,
    isactive: true,
    password: hashedPassword,
  });

  await healthAgentRepository.save(healthAgent);

  const newAgent: any = { ...healthAgent };

  return { ...newAgent, password: undefined };
};

export default createHealthAgentService;

import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { ICreateHealthAgent, IResponseHealthAgent } from "../../interfaces/healthAgent";

const createHealthAgentService = async ({
  name,
  email,
  password,
}: ICreateHealthAgent): Promise<IResponseHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const verifyEmail = await healthAgentRepository.findOneBy({ email: email });
  if (verifyEmail) {
    throw new AppError("e-mail already exists");
  }

  const hashedPassword = await hash(password, 10);

  const healthAgent = healthAgentRepository.create({
    name,
    email,
    isactive: true,
    password: hashedPassword,
  });

  await healthAgentRepository.save(healthAgent);

  const newAgent: any = {
    id: healthAgent.id,
    name: healthAgent.name,
    email: healthAgent.email,
    isactive: healthAgent.isactive,
  };

  return newAgent;
};

export default createHealthAgentService;

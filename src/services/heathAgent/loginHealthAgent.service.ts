import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";
import "dotenv/config";

const loginHealthAgentService = async (email: string, password: string) => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = await healthAgentRepository.findOneBy({ email: email });

  if (!agents) {
    throw new AppError("Invalid credentials.");
  }

  const passwordMatch = bcrypt.compareSync(password, agents.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials.");
  }
  const token = jwt.sign(
    { email: email, isActive: agents.isActive },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginHealthAgentService;
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { AppError } from "../../errors/appError";
import "dotenv/config";

const loginHealthAgentService = async (email: string, password: string) => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  if (!email) {
    throw new AppError("e-mail is required on body request");
  }

  if (!password) {
    throw new AppError("password is required on body request");
  }

  const agents = await healthAgentRepository.findOneBy({ email: email });

  if (!agents) {
    throw new AppError("Invalid credentials");
  }

  const passwordMatch = bcrypt.compareSync(password, agents.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials");
  }
  const token = jwt.sign({ isactive: agents.isactive, id: agents.id }, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
  });

  return token;
};

export default loginHealthAgentService;

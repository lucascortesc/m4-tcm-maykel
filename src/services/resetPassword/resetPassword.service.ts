import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
import { sendEmail } from "../../utils/sendEmail.util";

export const resetPasswordService = async (token: string, password: string): Promise<void> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = await healthAgentRepository.findOneBy({ token_reset_password: token });

  if (!agents) {
    throw new AppError("User does not exists", 400);
  }
  const hashedPassword = await hash(password, 10);
  await healthAgentRepository.update(
    { id: agents.id },
    {
      token_reset_password: "",
      password: hashedPassword,
    }
  );

  return;
};

import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
import { sendEmail } from "../../utils/sendEmail.util";

export const activateHealthAgentService = async (id: string): Promise<string> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agent = await healthAgentRepository.findOneBy({ id: id });

  if (!agent) {
    throw new AppError("Agent not found", 404);
  }

  if (agent.isactive) {
    throw new AppError("Agent is already active");
  }

  const activationToken = (Math.random() + 1).toString(36).substring(7);

  const emailData: IEmailRequest = {
    subject: "CIPAD - Ativação de usuário",
    text: `<h1>Ativação solicitada pelo usuário<h1>
          <h3>${agent.name}, ative sua conta clicando no link: <a>https://password-recovery-cipad.vercel.app/activate/${activationToken}</a> para utilizar o nosso sistema</h3>
    `,
    to: agent.email,
  };

  await healthAgentRepository.update(id, { activationToken });

  await sendEmail(emailData);

  return "Reactivate e-mail sent";
};

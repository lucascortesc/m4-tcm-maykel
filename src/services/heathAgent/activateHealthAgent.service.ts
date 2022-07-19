import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
// import { IUpdateHealthAgent } from "../../interfaces/healthAgent";
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
    subject: "Ativação de usuário",
    text: `<h1>Por favor confirme seu email<h1>
          <h3>${agent.name}, ative sua conta clicando no link: https://password-recovery-cipad.vercel.app/activate/${activationToken} para utilizar o nosso sistema</h3>
    `,
    to: agent.email,
  };

  await healthAgentRepository.update(id, { activationToken });

  await sendEmail(emailData);

  return "Reactivate e-mail sent";

  // await healthAgentRepository.update(id, { isactive: true });

  // const updatedAgent = await healthAgentRepository.findOneBy({ id: id });

  // if (!updatedAgent) {
  //   throw new AppError("Something wrong with de server, try again");
  // }
  // if (!updatedAgent.isactive) {
  //   throw new AppError("Something went wrong and agent has not been activated, try again");
  // }

  // const responseAgent = {
  //   id: updatedAgent.id,
  //   name: updatedAgent.name,
  //   email: updatedAgent.email,
  //   isactive: updatedAgent.isactive,
  // };

  // return responseAgent;
};

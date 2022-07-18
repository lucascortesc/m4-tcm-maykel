import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
import { sendEmail } from "../../utils/sendEmail.util";

export const sendResetPasswordService = async (
  email: string,
  protocol: string,
  host: string | undefined
): Promise<void> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const agents = await healthAgentRepository.findOneBy({ email: email });

  if (!agents) {
    throw new AppError("User does not exists", 400);
  }
  const resetPasswordToken = (Math.random() + 1).toString(36).substring(2);
  await healthAgentRepository.update(
    { id: agents.id },
    {
      token_reset_password: resetPasswordToken,
    }
  );
  const emailData: IEmailRequest = {
    subject: "Password recovery",
    text: `<h1>Password recovery requested by user</h1>
     <h3>Hello ${agents.name}, use the follow link to change your password: https://password-recovery-cipad.vercel.app/recovery/${resetPasswordToken}</h3>`,
    to: email,
  };
  await sendEmail(emailData);
};

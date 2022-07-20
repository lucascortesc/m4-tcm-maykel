import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IEmailRequest } from "../../interfaces/emails";
import { ICreateHealthAgent, IResponseHealthAgent } from "../../interfaces/healthAgent";
import { sendEmail } from "../../utils/sendEmail.util";

const createHealthAgentService = async (
  { name, email, password }: ICreateHealthAgent,
  protocol: string,
  host: string | undefined
): Promise<IResponseHealthAgent> => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const verifyEmail = await healthAgentRepository.findOneBy({ email: email });
  if (verifyEmail) {
    throw new AppError("E-mail already exists");
  }

  const hashedPassword = await hash(password, 10);
  const activationToken = (Math.random() + 1).toString(36).substring(7);

  const healthAgent = healthAgentRepository.create({
    name,
    email,
    isactive: false,
    password: hashedPassword,
    activationToken: activationToken,
  });

  const emailData: IEmailRequest = {
    subject: "CIPAD - Ativação de usuário",
    text: `<h1>Por favor confirme seu email<h1>
          <h3>Seja bem-vindo ao CIPAD ${name}, ative sua conta <a href="https://password-recovery-cipad.vercel.app/activate/${activationToken}" target="_blank">clicando aqui</a> para utilizar o nosso sistema.</h3>
    `,
    to: email,
  };

  await sendEmail(emailData);

  await healthAgentRepository.save(healthAgent);

  const newAgent: IResponseHealthAgent = {
    id: healthAgent.id,
    name: healthAgent.name,
    email: healthAgent.email,
    isactive: healthAgent.isactive,
  };

  return newAgent;
};

export default createHealthAgentService;

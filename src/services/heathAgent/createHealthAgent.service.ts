import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
<<<<<<< HEAD
import { IEmailRequest } from "../../interfaces/emails";
import { ICreateHealthAgent, IHealthAgent } from "../../interfaces/healthAgent";
import { sendEmail } from "../../utils/sendEmail.util";

const createHealthAgentService = async ({ name, email, password }: ICreateHealthAgent, protocol:string, host:string | undefined): Promise<IHealthAgent> => {
=======
import { ICreateHealthAgent, IResponseHealthAgent } from "../../interfaces/healthAgent";

const createHealthAgentService = async ({
  name,
  email,
  password,
}: ICreateHealthAgent): Promise<IResponseHealthAgent> => {
>>>>>>> 99d20dbd5df26efda414afb72560324df7da5359
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  const verifyEmail = await healthAgentRepository.findOneBy({ email: email });
  if (verifyEmail) {
    throw new AppError("e-mail already exists");
  }

  const hashedPassword = await hash(password, 10);
  const activationToken = (Math.random()+1).toString(36).substring(7)

  const healthAgent = healthAgentRepository.create({
    name,
    email,
    isactive: false,
    password: hashedPassword,
    activationToken:activationToken
  });


  const emailData:IEmailRequest = {
    subject:"Ativação de usuário",
    text:`<h1>Por favor confirme seu email<h1>
          <h3>Seja bem-vindo ao CIPAD ${name}, ative sua conta clicando no link: ${protocol}://${host}/agent/activate/${activationToken} para utilizar o nosso sistema</h3>
    `,
    to:email
  }

  await sendEmail(emailData)

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

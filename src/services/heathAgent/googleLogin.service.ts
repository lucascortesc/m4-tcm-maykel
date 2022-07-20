import AppDataSource from "../../data-source";
import { Agent } from "../../entities/healthAgent.entity";
import { AppError } from "../../errors/appError";
import { IGoogle } from "../../interfaces/emails";
import jwt from "jsonwebtoken";

export const googleLogin = async (data: IGoogle) => {
  const healthAgentRepository = AppDataSource.getRepository(Agent);

  if (!data) {
    throw new AppError("Oops! Something got wrong");
  }
  let user = await healthAgentRepository.findOneBy({ email: data.email });

  if (!user) {
    user = healthAgentRepository.create({
      name: data.name,
      email: data.email,
      isactive: true,
      password: "",
      google_id: data.id,
    });

    await healthAgentRepository.save(user);
  }

  if (!user) {
    throw new AppError("Oops! Something got wrong.");
  }

  if (!user.google_id && data.verified_email) {
    await healthAgentRepository.update(user.id, {
      google_id: data.id,
      isactive: true,
    });
  }

  user = await healthAgentRepository.findOneBy({ email: data.email });

  if (user?.google_id !== data.id) {
    throw new AppError("Oops! Something got wrong.");
  }

  const token = jwt.sign({ isactive: user.isactive, id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: "24h",
  });

  return token;
};

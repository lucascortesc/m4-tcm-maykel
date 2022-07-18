import AppDataSource from "../../data-source";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";

export const deleteAddressService = async (id: string, agentId: string): Promise<string> => {
  const addressRepository = AppDataSource.getRepository(Address);

  const findAddress = await addressRepository.findOneBy({ id: id });

  if (!findAddress) {
    throw new AppError("address does not exists", 404);
  }

  if (findAddress.agent.id !== agentId) {
    throw new AppError("Agent does not have access to address", 403);
  }

  await addressRepository.delete(id);

  return "address deleted with success";
};

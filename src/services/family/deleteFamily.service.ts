import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";

const deleteFamilyService = async (id: string, userId: string): Promise<string> => {
  const familyRepository = AppDataSource.getRepository(Family);
  const addressRepository = AppDataSource.getRepository(Address);

  const findFamily = await familyRepository.findOneBy({ id: id });

  if (!findFamily) {
    throw new AppError("Family not found", 404);
  }

  const findAddress = await addressRepository.findOneBy({ id: findFamily.address.id });

  if (!findAddress) {
    throw new AppError("Address not found", 404);
  }

  if (findAddress.agent.id !== userId) {
    throw new AppError("Agent does not have access to family", 403);
  }

  await familyRepository.delete(id);

  return "Family deleted with success";
};

export default deleteFamilyService;

import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { iCreateFamily, IRequestFamily } from "../../interfaces/family";

export const createFamilyService = async ({ name, address_id }: iCreateFamily): Promise<IRequestFamily> => {
  const familyRepository = AppDataSource.getRepository(Family);
  const addressRepository = AppDataSource.getRepository(Address);

  if (!name) {
    throw new AppError("Name cannot be null", 400);
  }

  const findAddress = await addressRepository.findOneBy({
    id: address_id,
  });

  if (!findAddress) {
    throw new AppError("Address cannot be null", 400);
  }

  const newFamily = await familyRepository.save({
    name,
    address: findAddress,
  });

  const responseFamily = {
    id: newFamily.id,
    name: newFamily.name,
    address_id: newFamily.address.id,
  };

  return responseFamily;
};

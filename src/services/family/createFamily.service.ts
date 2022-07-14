import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { Address } from "../../entities/address.entity";
import { AppError } from "../../errors/appError";
import { iFamily } from "../../interfaces/family";

export const createFamilyService = async ({
  name,
  address,
}: iFamily): Promise<Family> => {
  const familyRepository = AppDataSource.getRepository(Family);
  const addressRepository = AppDataSource.getRepository(Address);

  const newAddress = addressRepository.create({
    ...address,
  });

  await addressRepository.save(newAddress);

  const newFamily = familyRepository.create({
    name,
    address: newAddress,
  });

  await familyRepository.save(newFamily);

  return newFamily;
};

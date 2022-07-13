import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { AppError } from "../../errors/appError";

const deleteFamilyService = async (id: string): Promise<string> => {
  const familyRepository = AppDataSource.getRepository(Family);

  const findFamily = await familyRepository.findOneBy({ id: id });

  if (!findFamily) {
    throw new AppError("Family not found");
  }

  await familyRepository.delete(id);

  return "Family deleted with success.";
};

export default deleteFamilyService;

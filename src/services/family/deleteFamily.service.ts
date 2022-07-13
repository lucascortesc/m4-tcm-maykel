import AppDataSource from "../../data-source";
import { Family } from "../../entities/family.entity";
import { AppError } from "../../errors/appError";

const deleteFamilyService = async (id: string): Promise<string> => {
  const familyRepository = AppDataSource.getRepository(Family);

  await familyRepository.delete(id);

  return "Family deleted with success.";
};

export default deleteFamilyService;

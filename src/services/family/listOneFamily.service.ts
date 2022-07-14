import AppDataSource from "../../data-source"
import { Family } from "../../entities/family.entity"

const listOneFamilyService = async (id: string) => {
    const findFamilyRepo = AppDataSource.getRepository(Family)
    const findOneFamily = await findFamilyRepo.findOneBy({ id: id })

    return findOneFamily
}

export default listOneFamilyService
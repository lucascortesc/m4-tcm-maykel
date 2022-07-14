import AppDataSource from "../../data-source"
import { Family } from "../../entities/family.entity"
import { iUpdateFamily } from "../../interfaces/family"

const updateFamilyService = async (data: iUpdateFamily, id: string) => {
    const getFamilyRepo = AppDataSource.getRepository(Family)
    await getFamilyRepo.update(id, data)

    const findFamilyAfterUpdate = await getFamilyRepo.findOneBy({ id: id })

    return findFamilyAfterUpdate
}

export default updateFamilyService
import AppDataSource from "../../data-source"
import { Family } from "../../entities/family.entity"
import { Address } from "../../entities/address.entity"
import { iUpdateFamily } from "../../interfaces/family"
import { AppError } from "../../errors/appError"

const updateFamilyService = async (data: iUpdateFamily, id: string, userId: string) => {
    const getFamilyRepo = AppDataSource.getRepository(Family)
    const findFamily = await getFamilyRepo.findOneBy({ id: id })

    if (!findFamily) {
        throw new AppError("Family not found", 404)
    }

    const getAddressRepo = AppDataSource.getRepository(Address)
    const findAddress = await getAddressRepo.findOneBy({ id: findFamily.address.id })

    if (!findAddress) {
        throw new AppError("Address not found", 404)
    }

    if (findAddress.agent.id !== userId) {
        throw new AppError("Agent does not have access to family", 401)
    }

    await getFamilyRepo.update(id, data)

    
    const findFamilyAfterUpdate = await getFamilyRepo.findOneBy({ id: id })
    
    if (!findFamilyAfterUpdate) {
        throw new AppError("Family not found", 404)
    }

    return {
        id: findFamilyAfterUpdate.id,
        name: findFamilyAfterUpdate.name,
        address_id: findFamilyAfterUpdate.address.id
    }
}

export default updateFamilyService
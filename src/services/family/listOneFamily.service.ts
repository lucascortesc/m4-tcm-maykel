import AppDataSource from "../../data-source"
import { Family } from "../../entities/family.entity"
import { AppError } from "../../errors/appError"
import { Address } from "../../entities/address.entity"

const listOneFamilyService = async (id: string, userId: string) => {
    const findFamilyRepo = AppDataSource.getRepository(Family)
    const findOneFamily = await findFamilyRepo.findOneBy({ id: id })

    if (!findOneFamily) {
        throw new AppError("Family not found", 404)
    }

    const findAddressRepo = AppDataSource.getRepository(Address)
    const findAddress = await findAddressRepo.findOneBy({ id: findOneFamily.address.id })

    if (!findAddress) {
        throw new AppError("Address not found", 404)
    }

    if (findAddress.agent.id !== userId) {
        throw new AppError("Agent does not have access to family", 401)
    }

    return {
        id: findOneFamily.id,
        name: findOneFamily.name,
        address_id: findOneFamily.address.id
    }
}

export default listOneFamilyService
import AppDataSource from "../../data-source"
import { Address } from "../../entities/address.entity"
import { Family } from "../../entities/family.entity"
import { Pacient } from "../../entities/pacient.entity"
import { AppError } from "../../errors/appError"

export const deletePacientService = async (id: string, userId: string) => {
    const getAddressRepo = AppDataSource.getRepository(Address)
    const getFamilyRepo = AppDataSource.getRepository(Family)
    const getPacientRepository = AppDataSource.getRepository(Pacient)

    const findPacient = await getPacientRepository.findOneBy({ id: id })

    if (!findPacient) {
        throw new AppError("Pacient not found", 404)
    }

    const findFamily = await getFamilyRepo.findOneBy({ id: findPacient.family.id })

    if (!findFamily) {
        throw new AppError("Family not found", 404)
    }

    const findAddress = await getAddressRepo.findOneBy({ id: findFamily.address.id })

    if (!findAddress) {
        throw new AppError("Address not found", 404)
    }

    if (findAddress.agent.id !== userId) {
        throw new AppError("Agent does not have access to pacient", 401)
    }

    await getPacientRepository.delete(id)

    return "OK"
}
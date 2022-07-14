import AppDataSource from "../../data-source"
import { HomeVisit } from "../../entities/homeVisit.entity"
import { AppError } from "../../errors/appError"

const deleteHomeVisitService = async (id: string) => {
    const getVisitsRepo = AppDataSource.getRepository(HomeVisit)
    await getVisitsRepo.delete(id)

    const findVisitAfterDelete = await getVisitsRepo.findOneBy({ id: id })
    if(!findVisitAfterDelete) {
        throw new AppError("Visit not found", 400)
    }

    return "OK"
}

export default deleteHomeVisitService
import AppDataSource from "../../data-source"
import { Agent } from "../../entities/healthAgent.entity"
import { HomeVisit } from "../../entities/homeVisit.entity"
import { AppError } from "../../errors/appError"

const deleteHomeVisitService = async (id: string, userId: string) => {
    const getVisitsRepo = AppDataSource.getRepository(HomeVisit)
    const findVisit = await getVisitsRepo.findOneBy({ id: id })

    if (!findVisit) {
        throw new AppError("Visit not found", 404)
    }

    if (findVisit.agent_id.id !== userId) {
        throw new AppError("Agent does not have access to visit", 401)
    }

    await getVisitsRepo.delete(id)

    const findVisitAfterDelete = await getVisitsRepo.findOneBy({ id: id })
    if(!findVisitAfterDelete) {
        throw new AppError("Visit not found", 400)
    }

    return "User deleted with success"
}

export default deleteHomeVisitService
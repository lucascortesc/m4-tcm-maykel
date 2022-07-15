import AppDataSource from "../../data-source"
import { HomeVisit } from "../../entities/homeVisit.entity"

export const listOneVisitService = async (id:string)=>{

   
    const homeVisitRepository = AppDataSource.getRepository(HomeVisit)

    const visit = await homeVisitRepository.findOneBy({id:id})
    if(visit){
        
    }
    return visit

}
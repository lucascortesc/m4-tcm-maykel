import { Address } from "../../entities/address.entity"
import { Agent } from "../../entities/healthAgent.entity"
import { Family } from "../../entities/family.entity"
import AppDataSource from "../../data-source"
import { AppError } from "../../errors/appError"


export const listAllFamiliesService = async (agentId:string)=>{

    const addressRepository = AppDataSource.getRepository(Address)
    const agentsRepository = AppDataSource.getRepository(Agent)
    const familyRepository = AppDataSource.getRepository(Family)
    
    const agent = await agentsRepository.findOneBy({id:agentId})
    
    if (!agent){
        
        throw new AppError("Agent does not exist")

    }

    const addresses = await addressRepository.find({
        where:{agent:agent}
    })

    if (!addresses){
        
        throw new AppError("There are no addresses registered for this agent.", 400)

    }

    //Encontrar familias por endereços e agentes


}
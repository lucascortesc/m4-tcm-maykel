import { Request, Response } from "express"; 
import { listOneVisitService } from "../../services/homeVisit/listOneVisit.service";

export const listOneVisitController = async (req: Request, res:Response)=>{

    const {id} = req.params
    
    const visit = await listOneVisitService(id)

    return res.status(200).json(visit)

}
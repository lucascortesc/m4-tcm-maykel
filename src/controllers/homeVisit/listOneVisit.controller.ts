import { Request, Response } from "express"; 
import { AppError } from "../../errors/appError";
import { listOneVisitService } from "../../services/homeVisit/listOneVisit.service";

export const listOneVisitController = async (req: Request, res:Response)=>{

    const {id} = req.params
    const {userId} = req
    const visit = await listOneVisitService(id, userId)
   
    return res.status(200).json(visit)

}
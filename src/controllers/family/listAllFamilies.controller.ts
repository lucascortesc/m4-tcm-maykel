import { Request, Response } from "express";
import { listAllFamiliesService } from "../../services/family/listAllFamilies.service";

export const listAllFamiliesControler = async (req: Request, res: Response) => {
    const agentId = req.userId;
    
    const listFamilies = await listAllFamiliesService(agentId)

    return res.status(200).json(listFamilies)

};

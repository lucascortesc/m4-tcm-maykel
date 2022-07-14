import { Request, Response } from "express";
import { listAllFamiliesService } from "../../services/family/listAllFamilies.service";

export const listAllFamiliesControler = async (req: Request, res: Response) => {

    const listFamilies = await listAllFamiliesService()

    return res.status(200).json(listFamilies)

};

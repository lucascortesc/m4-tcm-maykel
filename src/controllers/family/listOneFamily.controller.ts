import { Request, Response } from "express";
import listOneFamilyService from "../../services/family/listOneFamily.service";

const listOneFamilyController = async (req: Request, res: Response) => {
    const { id } = req.params
    const listOneFamily = await listOneFamilyService(id)

    return res.json(listOneFamily)
}

export default listOneFamilyController
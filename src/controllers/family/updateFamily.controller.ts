import { Request, Response } from "express"
import updateFamilyService from "../../services/family/updateFamily.service"

const updateFamilyController = async (req: Request, res: Response) => {
    const { id } = req.params
    const update = await updateFamilyService(req.body, id)

    return res.json(update)
}

export default updateFamilyController
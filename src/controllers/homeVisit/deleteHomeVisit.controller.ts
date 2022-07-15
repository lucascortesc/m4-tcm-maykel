import { Request, Response } from "express";
import deleteHomeVisitService from "../../services/homeVisit/deleteHomeVisit.service";

const deleteHomeVisitController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { userId } = req
    const deleteVisit = await deleteHomeVisitService(id, userId)

    return res.status(200).json({
        "message": deleteVisit
    })
}

export default deleteHomeVisitController
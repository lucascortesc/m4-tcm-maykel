import { Request, Response } from "express";
import deleteHomeVisitService from "../../services/homeVisit/deleteHomeVisit.service";

const deleteHomeVisitController = async (req: Request, res: Response) => {
    const { id } = req.params
    await deleteHomeVisitService(id)

    return res.status(200).json({
        "message": "Visit deleted with success"
    })
}

export default deleteHomeVisitController
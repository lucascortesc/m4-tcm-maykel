import { Request, Response } from "express";
import { deletePacientService } from "../../services/pacient/deletePacient.service";

export const deletePacientController = async (req: Request, res: Response) => {
    const { id } = req.params
    const { userId } = req
    const deletePacient = await deletePacientService(id, userId)

    return res.status(400).json({
        "message": "Pacient deleted with success"
    })
}
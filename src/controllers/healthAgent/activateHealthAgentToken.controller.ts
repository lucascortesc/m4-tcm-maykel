import { Request, Response } from "express";
import { activateHealthAgentTokenService } from "../../services/heathAgent/activateHealthAgentToken.service";

export const activateHealthAgentTokenController = async (req: Request, res: Response)=>{

    const activateToken = req.params.activateToken

    await activateHealthAgentTokenService(activateToken)

    return res.json({
        message: "agent activated successfully"
    })
}
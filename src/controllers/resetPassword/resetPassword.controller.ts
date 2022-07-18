import { Request, Response } from "express";
import { resetPasswordService } from "../../services/resetPassword/resetPassword.service";

export const resetPasswordController = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;

  await resetPasswordService(token, password);

  return res.json({ message: "Password changed" });
};

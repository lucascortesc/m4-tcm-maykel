import { Request, Response } from "express";
import { sendResetPasswordService } from "../../services/resetPassword/sendResetPassword.service";

export const sendResetPasswordController = async (req: Request, res: Response) => {
  const { email } = req.body;
  const { protocol } = req;
  const host = req.get("host");
  await sendResetPasswordService(email, protocol, host);

  return res.json({ message: "Recovery email sent" });
};

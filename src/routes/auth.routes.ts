import { Request, Response, Router } from "express";
import { getGoogleInfo, getGoogleToken, loginGoogleUrl } from "../auth/google";
import { googleLogin } from "../services/heathAgent/googleLogin.service";

const authRoutes = Router();

authRoutes.get("/login/google", (req: Request, res: Response) => {
  res.redirect(loginGoogleUrl);
});

authRoutes.get("/auth/google", async (req: Request, res: Response) => {
  const { code } = req.query;

  const token = await getGoogleToken(code);
  const data = await getGoogleInfo(token);
  const loginToken = await googleLogin(data);

  res.json({ name: data.name, email: data.email, token: loginToken });
});

export default authRoutes;

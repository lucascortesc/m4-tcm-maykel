import { Router } from "express";
import { sendEmailController } from "../controllers/emails/sendEmail.controller";
import { authorization } from "../middlewares/Authorization.middleware";

const emailRoutes = Router()

emailRoutes.post('', authorization, sendEmailController)


export default emailRoutes
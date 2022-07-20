import { createTransport } from "nodemailer";
import { IEmailRequest } from "../interfaces/emails";
import "dotenv/config";
import { AppError } from "../errors/appError";

export const sendEmail = async ({ subject, text, to }: IEmailRequest) => {
  const transporter = createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "no-reply.cipad@outlook.com",
      pass: "VascoDaGama",
    },
  });

  await transporter
    .sendMail({
      from: "no-reply.cipad@outlook.com",
      to: to,
      subject: subject,
      html: text,
    })
    .then(() => {
      console.log("Email sent with success");
    })
    .catch((err) => {
      console.log(err);
      throw new AppError("Error sending email, try again later", 418);
    });
};
